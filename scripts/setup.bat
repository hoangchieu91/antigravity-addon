@echo off
echo ===================================================
echo   ANTIGRAVITY ADDON - SETUP
echo ===================================================

echo [1/3] Checking environment...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed. Please install Node.js first!
    pause
    exit /b 1
) else (
    echo [OK] Node.js found.
)

echo [2/3] Installing Server dependencies...
cd packages\server
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install server dependencies.
    cd ..\..
    pause
    exit /b 1
)
cd ..\..

echo [3/3] Suggesting Extension installation...
where code >nul 2>nul
if %errorlevel% equ 0 (
    echo [INFO] VS Code CLI found. Attempting to install extension if packaged...
    if exist "packages\extension\antibridge-auto-accept-1.0.0.vsix" (
        call code --install-extension "packages\extension\antibridge-auto-accept-1.0.0.vsix"
    ) else (
        echo [INFO] VSIX not found in source. You may need to package it first or install manually.
    )
) else (
    echo [INFO] VS Code CLI not found. Skipping auto-install of extension.
)

echo ===================================================
echo   SETUP COMPLETED SUCCESSFULLY!
echo ===================================================
echo You can now run 'scripts\start_all.bat' to start the system.
pause
