#!/bin/bash

echo "======================================================"
echo "  AntiBridge + AutoAccept - KICH HOAT TAT CA (LINUX)"
echo "======================================================"
echo ""

# Pathing
CORE_PATH="$(cd "$(dirname "${BASH_SOURCE[0]}")/../4-Core-Server" && pwd)"

echo "[1/3] Dang mo Antigravity voi cong Debug 9000..."
# Try common linux paths/commands for Antigravity
if command -v antigravity &> /dev/null; then
    antigravity --remote-debugging-port=9000 &
else
    echo "[!] Khong tim thay lenh 'antigravity' trong PATH. Dang thu tim trong /usr/bin..."
    /usr/bin/antigravity --remote-debugging-port=9000 &
fi

echo "[2/3] Dang khoi dong Server dieu khien tu xa..."
sleep 5
cd "$CORE_PATH/backend" && npm start &

echo "[3/3] Dang mo giao diện điều khiển trên trình duyệt..."
sleep 3
if command -v xdg-open &> /dev/null; then
    xdg-open http://localhost:8000
elif command -v google-chrome &> /dev/null; then
    google-chrome http://localhost:8000
fi

echo ""
echo "======================================================"
echo "  DA KICH HOAT THANH CONG!"
echo "------------------------------------------------------"
echo "  1. Antigravity dang chay o cong 9000"
echo "  2. Server dang chay o cong 8000"
echo "  3. Hay chac chan ban da cai dat Extension trong thu muc '3-Extension'"
echo "======================================================"
echo ""
