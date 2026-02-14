@echo off
title Antigravity Addon Controller
echo ===================================================
echo   ANTIGRAVITY ADDON - START ALL
echo ===================================================

echo [INFO] Starting Server...
start "Antigravity Server" cmd /k "cd packages\server && npm start"

echo [INFO] Server should be running on http://localhost:1103
echo.

for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr "IPv4 Address"') do (
    set IP=%%a
)
set IP=%IP: =%
echo [INFO] Server local IP: http://%IP%:1103
echo.
echo [INSTRUCTIONS]
echo 1. Mo Antigravity voi Debug Mode bang file: OPEN_ANTIGRAVITY_DEBUG.bat
echo 2. Chay tiep file: packages\server\scripts\AUTO_INJECT.bat
echo 3. Truy cap tu dien thoai: http://%IP%:1103
echo.
echo [NOTE] Neu khong ket noi duoc tu xa, hay chay lenh sau trong PowerShell (Admin):
echo New-NetFirewallRule -DisplayName "Allow Antigravity Remote" -Direction Inbound -LocalPort 1103 -Protocol TCP -Action Allow
echo.
pause
