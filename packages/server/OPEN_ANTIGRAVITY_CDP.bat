@echo off
:: AntiBridge v3.0.0 - Open Antigravity with CDP Port 9000
:: This BAT file opens Antigravity with remote debugging enabled

:: Hide this CMD window after starting Antigravity
start "" "%USERPROFILE%\AppData\Local\Programs\antigravity\Antigravity.exe" --remote-debugging-port=9000

:: Exit immediately
exit
