# Antigravity Addon Bundle

Bộ công cụ tích hợp giúp điều khiển Antigravity AI từ xa và tự động hóa thao tác.

## 📂 Cấu trúc dự án
- `packages/extension`: Mã nguồn Active Extension và file cài đặt `.vsix`.
- `packages/server`: Mã nguồn Server điều khiển (Remote Control).
- `scripts/`: Chứa các script cài đặt và khởi động.

## 🚀 Hướng dẫn nhanh

### 1. Cài đặt ban đầu
Chạy file `scripts\setup.bat` để:
- Kiểm tra môi trường Node.js.
- Cài đặt thư viện cho Server.
- Tự động cài đặt Extension vào VS Code (nếu có thể).

### 2. Khởi động hệ thống
Chạy file `scripts\start_all.bat`.
- Server sẽ khởi động tại `http://localhost:8000`.
- Mở Antigravity và đảm bảo extension đã được bật.

## ⚡ Tính năng
- **Auto Access**: Tự động chấp nhận các yêu cầu từ Agent/Terminal.
- **Remote Control**: Điều khiển Antigravity từ trình duyệt điện thoại hoặc máy tính khác.

### ⚙️ Cấu hình nâng cao
Bạn có thể thêm các lệnh khác vào cơ chế Auto Access thông qua settings `antibridge.additionalCommands`.
Ví dụ: Muốn auto accept cả GitHub Copilot, thêm `github.copilot.accept` vào mảng config này.

---
*Dựa trên dự án gốc của hoangchieu91 & Linh Ban Banh Bao*
