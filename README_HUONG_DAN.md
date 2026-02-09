# 🚀 Antigravity Addon Bundle - hoangchieu91

Bộ công cụ tích hợp giúp điều khiển Antigravity AI từ xa và tự động hóa thao tác.

## 📂 Cấu trúc thư mục
1.  **[1-Windows](file:///./1-Windows)**: Chứa lệnh kích hoạt nhanh cho máy Windows.
2.  **[2-Linux](file:///./2-Linux)**: Chứa lệnh kích hoạt nhanh cho máy Linux Mint.
3.  **[3-Extension](file:///./3-Extension)**: Chứa file cài đặt AutoAccept cho Antigravity.
4.  **[4-Core-Server](file:///./4-Core-Server)**: Mã nguồn của máy chủ điều khiển.

---

## ⚡ Cách sử dụng "Một Lệnh Kích Hoạt"

### Bước 1: Cài đặt Extension (Chỉ làm 1 lần)
Bạn không cần copy thư mục vào phiên Antigravity. Bạn chỉ cần **cài đặt** nó vào phần mềm Antigravity:
1. Mở Antigravity trên máy của bạn.
2. Nhấn `Ctrl+Shift+P` -> Tìm "Extensions: Install from VSIX...".
3. Chọn file trong thư mục `3-Extension`.
*Sau khi cài xong, nó sẽ luôn ở đó cho mọi phiên làm việc.*

### Bước 2: Kích hoạt hệ thống
Tùy vào máy bạn đang dùng, hãy vào thư mục tương ứng:
- **Windows**: Chạy file `KICH_HOAT_TAT_CA.bat`.
- **Linux**: Chạy file `kich_hoat_tat_ca.sh` (nhớ cấp quyền thực thi: `chmod +x kich_hoat_tat_ca.sh`).

**Lệnh này sẽ tự động:**
1. Mở Antigravity với cổng Debug 9000.
2. Khởi động Server AntiBridge.
3. Mở sẵn trang điều khiển trên trình duyệt cho bạn.

---

## 🕒 Tính năng Hẹn giờ (Timer)
Trong Antigravity, bạn có thể nhấn `Ctrl+Alt+Shift+H` để hẹn giờ tự động chấp nhận trong 20-30 phút như đã yêu cầu.

---

## 🛡️ Đảm bảo quyền riêng tư
Toàn bộ dữ liệu chỉ truyền trong mạng nội bộ của bạn. Không có dữ liệu nào bị gửi ra internet bên ngoài.

*Chúc bạn làm việc hiệu quả với Antigravity!*
