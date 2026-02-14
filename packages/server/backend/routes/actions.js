/**
 * Actions Routes - API endpoints cho Accept/Reject và Model Switching
 */

const express = require('express');
const router = express.Router();

module.exports = (antigravityBridge) => {
    // ========== ACCEPT/REJECT ENDPOINTS ==========

    router.post('/accept', async (req, res) => {
        try {
            console.log(' Accept request...');
            const result = await antigravityBridge.sendAcceptShortcut();
            res.json(result);
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    });

    router.post('/reject', async (req, res) => {
        try {
            console.log(' Reject request...');
            const result = await antigravityBridge.sendRejectShortcut();
            res.json(result);
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    });

    router.post('/toggle-auto', async (req, res) => {
        try {
            console.log(' Toggle Auto Accept request...');
            const result = await antigravityBridge.sendToggleShortcut();
            res.json(result);
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    });

    // ========== MODEL SWITCHING ENDPOINTS ==========

    router.post('/switch-model-next', async (req, res) => {
        try {
            console.log(' Switch to next model request...');
            const result = await antigravityBridge.switchToNextModel();
            res.json(result);
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    });

    router.post('/open-model-picker', async (req, res) => {
        try {
            console.log(' Open model picker request...');
            const result = await antigravityBridge.openModelPicker();
            res.json(result);
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    });

    router.post('/change-model', async (req, res) => {
        try {
            // Support cả modelId và modelName
            const modelName = req.body.modelName || req.body.modelId;

            if (!modelName) {
                return res.status(400).json({
                    success: false,
                    error: 'modelName or modelId is required'
                });
            }

            console.log('🎨 Change model to', modelName, 'request...');
            const result = await antigravityBridge.changeModel(modelName);
            res.json(result);
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    });

    // ========== CDP CLICK ENDPOINTS (v3.0.0 - Non-Extension) ==========

    router.post('/accept-click', async (req, res) => {
        try {
            console.log('🟢 Accept by CDP Click request...');
            const result = await antigravityBridge.acceptByClick();
            res.json(result);
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    });

    router.post('/reject-click', async (req, res) => {
        try {
            console.log('🔴 Reject by CDP Click request...');
            const result = await antigravityBridge.rejectByClick();
            res.json(result);
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    });

    router.post('/stop', async (req, res) => {
        try {
            console.log('⏹️ Stop Generation request...');
            const result = await antigravityBridge.stopGeneration();
            res.json(result);
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    });

    router.get('/state', async (req, res) => {
        try {
            console.log('📊 Get State request...');
            const result = await antigravityBridge.getCurrentState();
            res.json(result);
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    });

    // ========== TOGGLE AUTO/MANUAL (Extension Shortcut) ==========

    router.post('/toggle-cdp', async (req, res) => {
        try {
            console.log('🔄 Toggle Auto/Manual via CDP shortcut...');
            const result = await antigravityBridge.sendToggleShortcut();
            res.json(result);
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    });

    // ========== CONVERSATION MODE (Planning/Fast) ==========

    router.post('/change-conv-mode', async (req, res) => {
        try {
            const modeName = req.body.modeName;

            if (!modeName) {
                return res.status(400).json({
                    success: false,
                    error: 'modeName is required (Planning or Fast)'
                });
            }

            console.log(`📋 Change conversation mode to: ${modeName}...`);
            const result = await antigravityBridge.changeConvMode(modeName);
            res.json(result);
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    });

    // ========== FOR COMPATIBILITY WITH FRONTEND (app.js) ==========

    router.post('/accept-cdp', async (req, res) => {
        try {
            console.log('🟢 [app.js] Accept via CDP request...');
            const result = await antigravityBridge.acceptByClick();
            res.json(result);
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    });

    router.post('/reject-cdp', async (req, res) => {
        try {
            console.log('🔴 [app.js] Reject via CDP request...');
            const result = await antigravityBridge.rejectByClick();
            res.json(result);
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    });

    // ========== FOR COMPATIBILITY WITH STARTUP (startup.js) ==========

    router.post('/start', async (req, res) => {
        try {
            console.log('🎯 [startup.js] Starting AcceptDetector...');
            const acceptDetector = req.app.locals.acceptDetector;
            if (acceptDetector) {
                // Determine base WS URL
                const port = process.env.PORT || 1103;
                const wsUrl = `ws://localhost:${port}/ws/action-bridge`;

                acceptDetector.start(wsUrl);
                res.json({ success: true, message: 'AcceptDetector started', wsUrl });
            } else {
                res.status(503).json({ success: false, error: 'AcceptDetector service not available' });
            }
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    });

    router.post('/stop-detector', async (req, res) => {
        try {
            console.log('🛑 Stopping AcceptDetector...');
            const acceptDetector = req.app.locals.acceptDetector;
            if (acceptDetector) {
                acceptDetector.stop();
                res.json({ success: true, message: 'AcceptDetector stopped' });
            } else {
                res.status(503).json({ success: false, error: 'AcceptDetector service not available' });
            }
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    });

    return router;
};
