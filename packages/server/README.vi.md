# 🌉 AntiBridge Remote Control - Hướng dẫn sử dụng

Điều khiển Antigravity AI từ xa thông qua giao diện Web/Mobile. Phù hợp cho việc sử dụng trên Windows và Linux Mint.

## 🚀 Tính năng chính
- **Điều khiển từ xa**: Gửi tin nhắn và nhận phản hồi từ Antigravity qua điện thoại.
- **Auto-Accept Bridge**: Phối hợp với extension để tự động chấp nhận các hành động của AI.
- **An toàn & Riêng tư**: Dữ liệu truyền trực tiếp trong mạng LAN/VPN của bạn, không qua server trung gian.
- **Snapshot Real-time**: Xem màn hình hiện tại của Antigravity ngay trên điện thoại.

---

## 💻 Cài đặt (Windows & Linux Mint)

### 1. Yêu cầu hệ thống
- **Node.js**: Phiên bản 18.0.0 trở lên.
- **Antigravity**: Đã được cài đặt trên máy.

### 2. Các bước cài đặt
1. Mở terminal (CMD/PowerShell trên Windows hoặc Terminal trên Linux).
2. Di chuyển vào thư mục dự án:
   ```bash
   cd AntiBridge-Antigravity-remote
   ```
3. Cài đặt các thư viện cần thiết:
   ```bash
   npm install
   ```

---

## 🔌 Cách khởi chạy

### Bước 1: Mở Antigravity với cổng Debug
Hệ thống cần Antigravity mở cổng debug 9223 để điều khiển.
- **Windows**: Chạy file `OPEN_ANTIGRAVITY_CDP.bat`.
- **Linux**: Chạy lệnh sau trong terminal:
  ```bash
  antigravity --remote-debugging-port=9223
  ```

### Bước 2: Chạy Server AntiBridge
Trong thư mục dự án, chạy lệnh:
```bash
npm start
```
Server sẽ mặc định chạy tại địa chỉ: `http://localhost:8000`.

### Bước 3: Truy cập từ Điện thoại/Thiết bị khác
1. Đảm bảo điện thoại và máy tính cùng kết nối chung một mạng Wifi (hoặc VPN).
2. Lấy địa chỉ IP của máy tính (ví dụ: `192.168.1.15`).
3. Mở trình duyệt trên điện thoại và truy cập: `http://192.168.1.15:8000`.

---

## 🛡️ Lưu ý An toàn (QUAN TRỌNG)
- **Không có mật khẩu**: Server này mặc định không có lớp đăng nhập. Bất kỳ ai trong mạng LAN đều có thể truy cập.
- **Chỉ dùng trong mạng tin tưởng**: Tuyệt đối không "Public" cổng 8000 ra internet (port forwarding) nếu không có lớp bảo mật bổ sung.
- **Tắt khi không dùng**: Để đảm bảo an toàn, hãy tắt server bằng lệnh `Ctrl+C` khi bạn không có nhu cầu điều khiển từ xa.

---

## 📧 Hỗ trợ
Tác giả: Linh Bui (linhbanbanhbao@gmail.com)
Mã nguồn được chỉnh sửa và tối ưu bởi AI Assistant.
