@echo off
title Antigravity Addon Controller
echo ===================================================
echo   ANTIGRAVITY ADDON - START ALL
echo ===================================================

echo [INFO] Starting Server...
start "Antigravity Server" cmd /k "cd packages\server && npm start"

echo [INFO] Server should be running on http://localhost:1103
echo.
set /p START_AG="Ban co muon mo Antigravity voi Debug Port 9000 khong? (y/n): "
if /i "%START_AG%"=="y" (
    echo [INFO] Dang mo Antigravity voi Port 9000...
    start "" "%USERPROFILE%\AppData\Local\Programs\antigravity\Antigravity.exe" --remote-debugging-port=9000
    
    echo [INFO] Dang doi Antigravity khoi dong (5s)...
    timeout /t 5 /nobreak > nul
    
    echo [INFO] Dang tu dong inject chat bridge...
    powershell -ExecutionPolicy Bypass -File "packages\server\scripts\auto_inject.ps1"
)
echo.
echo [INSTRUCTIONS]
echo 1. Neu ban khong chon 'y' o tren, hay mo Antigravity thu cong.
echo 2. Đảm bảo extension 'AntiBridge AutoAccept' đã được bật.
echo 3. Cửa sổ server cmd phai giu nguyen.
echo.
echo [TIP]
echo Truy cap http://localhost:1103 tren dien thoai/browser de dieu khien xxxx.
echo.
pause
