@echo off
setlocal
echo ======================================================
echo   AntiBridge + AutoAccept - KICH HOAT TAT CA (WINDOWS)
echo ======================================================
echo.

:: Pathing
set CORE_PATH=%~dp0..\4-Core-Server

echo [1/3] Dang mo Antigravity voi cong Debug 9000...
start "" "C:\Users\%USERNAME%\AppData\Local\Programs\antigravity\Antigravity.exe" --remote-debugging-port=9000
if errorlevel 1 (
    echo [LOI] Khong tim thay Antigravity. Vui long kiem tra lai duong dan!
    pause
    exit /b
)

echo [2/3] Dang khoi dong Server điều khiển từ xa...
timeout /t 5 /nobreak >nul
start "AntiBridge Server" cmd /k "cd /d %CORE_PATH%\backend && npm start"

echo [3/3] Dang mo giao dien dieu khien tren trinh duyet...
timeout /t 3 /nobreak >nul
start http://localhost:8000

echo.
echo ======================================================
echo   DA KICH HOAT THANH CONG!
echo ------------------------------------------------------
echo   1. Antigravity dang chay o cong 9000
echo   2. Server dang chay o cong 8000
echo   3. Hay chac chan ban da cai dat Extension trong thu muc '3-Extension'
echo ======================================================
echo.
pause
