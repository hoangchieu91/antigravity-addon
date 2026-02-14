@echo off
chcp 65001 >nul
color 0A

echo.
echo ╔════════════════════════════════════════════════════════╗
echo ║                                                        ║
echo ║       🚀 Antigravity Unified Launcher v1.0             ║
echo ║       Auto-Start Antigravity & Remote Server           ║
echo ║                                                        ║
echo ╚════════════════════════════════════════════════════════╝
echo.

REM ========================================
REM  Step 1: Check Node.js
REM ========================================
echo [1/3] Checking Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js not found! Please install Node.js v18+.
    pause
    exit /b 1
)
echo ✅ Node.js found.
echo.

REM ========================================
REM  Step 2: Start Antigravity (CDP Port 9223)
REM ========================================
echo [2/3] Starting Antigravity (Port 9223)...
start "" "%USERPROFILE%\AppData\Local\Programs\antigravity\Antigravity.exe" --remote-debugging-port=9223
echo ✅ Antigravity started.
echo.

REM ========================================
REM  Step 3: Start Server (Port 1103)
REM ========================================
echo [3/3] Starting Backend Server...
cd packages\server

if not exist "node_modules" (
    echo 📦 Installing dependencies...
    call npm install
)

echo.
echo 📢 Server starting on http://localhost:1103
echo 📢 Logs will appear below...
echo.
npm start
