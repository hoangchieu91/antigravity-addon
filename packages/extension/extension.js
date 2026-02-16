/**
 * AntiBridge-AutoAccept Extension
 * 
 * Extension độc lập - 2 nhiệm vụ:
 * 1. Đăng ký keyboard shortcuts (cho CDP remote trigger)
 * 2. Chế độ Auto Accept với delay người dùng tùy chỉnh
 * 
 * Settings (File > Preferences > Settings > AntiBridge):
 * - antibridge.autoAcceptDelay: Delay (ms), mặc định 2000
 * - antibridge.autoStartEnabled: Tự động bật khi khởi động
 * 
 * Keyboard Shortcuts:
 * - Ctrl+Alt+Shift+T: Toggle Auto Accept
 * - Ctrl+Alt+Shift+A: Manual Accept
 * - Ctrl+Alt+Shift+R: Manual Reject
 * - Ctrl+Alt+Shift+Up/Down: Tăng/Giảm delay
 * 
 * Author: Linh Ban Banh Bao
 * Version: 1.0.0
 */

const vscode = require('vscode');

// ============ STATE ============
let autoAcceptEnabled = false;
let statusBarItem = null;
let outputChannel = null;
let currentDelay = 2000;
let additionalCommands = [];
let autoAcceptTimer = null;

const MIN_DELAY = 500;
const MAX_DELAY = 10000;
const DELAY_STEP = 500;

let autoAcceptEndTime = null;
let timerRefreshInterval = null;

// ============ ACTIVATION ============
function activate(context) {
    console.log('🚀 AntiBridge-AutoAccept activated!');

    // Load settings
    loadSettings();

    // Watch for settings changes
    context.subscriptions.push(
        vscode.workspace.onDidChangeConfiguration(e => {
            if (e.affectsConfiguration('antibridge')) {
                loadSettings();
                if (autoAcceptEnabled) startAutoAccept();
                updateStatusBar();
            }
        })
    );

    // Create output channel for logging
    outputChannel = vscode.window.createOutputChannel('AntiBridge AutoAccess');
    context.subscriptions.push(outputChannel);
    log('🚀 AntiBridge-AutoAccept activated!');

    // Create status bar item
    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 10000);
    statusBarItem.command = 'antibridge.toggleAutoAccept';
    context.subscriptions.push(statusBarItem);
    updateStatusBar();
    statusBarItem.show();

    // Register commands
    context.subscriptions.push(
        vscode.commands.registerCommand('antibridge.toggleAutoAccept', toggleAutoAccept),
        vscode.commands.registerCommand('antibridge.manualAccept', manualAccept),
        vscode.commands.registerCommand('antibridge.manualReject', manualReject),
        vscode.commands.registerCommand('antibridge.increaseDelay', increaseDelay),
        vscode.commands.registerCommand('antibridge.decreaseDelay', decreaseDelay),
        vscode.commands.registerCommand('antibridge.startAutoAcceptWithTimer', startAutoAcceptWithTimer)
    );

    // Auto-start if enabled in settings
    const config = vscode.workspace.getConfiguration('antibridge');
    if (config.get('autoStartEnabled')) {
        autoAcceptEnabled = true;
        startAutoAccept();
        updateStatusBar();
        vscode.window.showInformationMessage(`🤖 Auto Accept: Started (${currentDelay}ms)`);
    } else {
        vscode.window.showInformationMessage(`📱 AntiBridge: Manual mode (${currentDelay}ms)`);
    }
}

// ============ SETTINGS ============
function loadSettings() {
    const config = vscode.workspace.getConfiguration('antibridge');
    currentDelay = config.get('autoAcceptDelay') || 2000;
    additionalCommands = config.get('additionalCommands') || [];

    // Clamp to valid range
    currentDelay = Math.max(MIN_DELAY, Math.min(MAX_DELAY, currentDelay));
}

function saveDelay(newDelay) {
    const config = vscode.workspace.getConfiguration('antibridge');
    config.update('autoAcceptDelay', newDelay, vscode.ConfigurationTarget.Global);
}

// ============ STATUS BAR ============
function updateStatusBar() {
    if (!statusBarItem) return;

    if (autoAcceptEnabled) {
        let timerText = '';
        if (autoAcceptEndTime) {
            const remainingSec = Math.max(0, Math.floor((autoAcceptEndTime - Date.now()) / 1000));
            const mins = Math.floor(remainingSec / 60);
            const secs = remainingSec % 60;
            timerText = ` [${mins}m${secs}s]`;
        }

        statusBarItem.text = `🤖 Auto (${currentDelay}ms)${timerText}`;
        statusBarItem.tooltip = `Auto Accept: ON\nDelay: ${currentDelay}ms\n${autoAcceptEndTime ? 'Ends at: ' + new Date(autoAcceptEndTime).toLocaleTimeString() : ''}\nClick to pause`;

        // Use a brighter color if recently triggered (handled by flashStatusBar)
        if (!statusBarItem.backgroundColor) {
            statusBarItem.backgroundColor = new vscode.ThemeColor('statusBarItem.warningBackground');
        }
    } else {
        statusBarItem.text = `📱 Manual`;
        statusBarItem.tooltip = `Manual mode\nDelay: ${currentDelay}ms\nCtrl+Alt+Shift+A = Accept\nCtrl+Alt+Shift+R = Reject`;
        statusBarItem.backgroundColor = undefined;
    }
}

// ============ AUTO ACCEPT ============
function toggleAutoAccept() {
    autoAcceptEnabled = !autoAcceptEnabled;
    if (!autoAcceptEnabled) {
        autoAcceptEndTime = null;
        stopTimerRefresh();
    }
    updateStatusBar();

    if (autoAcceptEnabled) {
        startAutoAccept();
        vscode.window.showInformationMessage(`🤖 Auto Accept: ON (${currentDelay}ms)`);
    } else {
        stopAutoAccept();
        vscode.window.showInformationMessage('📱 Manual Mode');
    }
}

function flashStatusBar() {
    if (!statusBarItem || !autoAcceptEnabled) return;

    const originalColor = statusBarItem.backgroundColor;
    // Brighten the status bar temporarily
    statusBarItem.backgroundColor = new vscode.ThemeColor('statusBarItem.errorBackground');
    statusBarItem.text = `🔥 ACCEPTING...`;

    setTimeout(() => {
        if (autoAcceptEnabled) {
            statusBarItem.backgroundColor = originalColor;
            updateStatusBar();
        }
    }, 500);
}

async function startAutoAcceptWithTimer() {
    const input = await vscode.window.showInputBox({
        prompt: 'Nhập số phút muốn chạy Auto Accept (ví dụ: 20 hoặc 30)',
        placeHolder: 'Minutes',
        validateInput: value => {
            const n = parseInt(value);
            return (isNaN(n) || n <= 0) ? 'Vui lòng nhập số phút hợp lệ (> 0)' : null;
        }
    });

    if (input) {
        const minutes = parseInt(input);
        autoAcceptEnabled = true;
        autoAcceptEndTime = Date.now() + minutes * 60 * 1000;

        startAutoAccept();
        startTimerRefresh();
        updateStatusBar();

        vscode.window.showInformationMessage(`🤖 Auto Accept: ON trong ${minutes} phút`);
    }
}

function startTimerRefresh() {
    stopTimerRefresh();
    timerRefreshInterval = setInterval(() => {
        if (autoAcceptEndTime && Date.now() >= autoAcceptEndTime) {
            autoAcceptEnabled = false;
            autoAcceptEndTime = null;
            stopAutoAccept();
            stopTimerRefresh();
            updateStatusBar();
            vscode.window.showWarningMessage('⏱️ Auto Accept đã tự động dừng (Hết thời gian)');
            return;
        }
        updateStatusBar();
    }, 1000);
}

function stopTimerRefresh() {
    if (timerRefreshInterval) {
        clearInterval(timerRefreshInterval);
        timerRefreshInterval = null;
    }
}

function log(message) {
    const timestamp = new Date().toLocaleTimeString();
    if (outputChannel) {
        outputChannel.appendLine(`[${timestamp}] ${message}`);
    }
    console.log(`[AutoAccept] ${message}`);
}

async function startAutoAccept() {
    stopAutoAccept();

    log(`▶️ Starting Auto Accept (Delay: ${currentDelay}ms)`);

    const runCycle = async () => {
        if (!autoAcceptEnabled) return;

        const commandsToTry = [
            'antigravity.agent.acceptAgentStep',
            'antigravity.terminal.accept',
            'antigravity.terminalCommand.accept',
            ...additionalCommands
        ];

        let anySuccess = false;
        for (const cmd of commandsToTry) {
            try {
                // Since we can't reliably know if a command did something, 
                // we'll trigger the flash if it at least tried to run.
                await vscode.commands.executeCommand(cmd);
                anySuccess = true;
            } catch (e) {
                if (e.message && !e.message.includes('not found')) {
                    log(`❌ Error executing ${cmd}: ${e.message}`);
                }
            }
        }

        if (anySuccess) {
            flashStatusBar();
        }

        // Schedule next run
        autoAcceptTimer = setTimeout(runCycle, currentDelay);
    };

    autoAcceptTimer = setTimeout(runCycle, currentDelay);
}

function stopAutoAccept() {
    if (autoAcceptTimer) {
        clearTimeout(autoAcceptTimer);
        autoAcceptTimer = null;
    }
    log('⏹️ Auto Accept stopped');
}

// ============ DELAY ADJUSTMENT ============
function increaseDelay() {
    if (currentDelay < MAX_DELAY) {
        currentDelay += DELAY_STEP;
        saveDelay(currentDelay);
        updateStatusBar();
        if (autoAcceptEnabled) startAutoAccept();
        vscode.window.setStatusBarMessage(`⏱️ Delay: ${currentDelay}ms`, 2000);
    }
}

function decreaseDelay() {
    if (currentDelay > MIN_DELAY) {
        currentDelay -= DELAY_STEP;
        saveDelay(currentDelay);
        updateStatusBar();
        if (autoAcceptEnabled) startAutoAccept();
        vscode.window.setStatusBarMessage(`⏱️ Delay: ${currentDelay}ms`, 2000);
    }
}

// ============ MANUAL ACCEPT/REJECT ============
async function manualAccept() {
    try { await vscode.commands.executeCommand('antigravity.agent.acceptAgentStep'); } catch (e) { }
    try { await vscode.commands.executeCommand('antigravity.terminal.accept'); } catch (e) { }
    try { await vscode.commands.executeCommand('antigravity.terminalCommand.accept'); } catch (e) { }
    vscode.window.setStatusBarMessage('✅ Accepted!', 2000);
}

async function manualReject() {
    try { await vscode.commands.executeCommand('antigravity.agent.rejectAgentStep'); } catch (e) { }
    try { await vscode.commands.executeCommand('antigravity.terminalCommand.reject'); } catch (e) { }
    vscode.window.setStatusBarMessage('❌ Rejected!', 2000);
}

// ============ DEACTIVATION ============
function deactivate() {
    stopAutoAccept();
}

module.exports = { activate, deactivate };
