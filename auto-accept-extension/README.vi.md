# 🤖 AntiBridge-AutoAccept - Hướng dẫn sử dụng

Tiện ích mở rộng (Extension) giúp tự động hóa việc chấp nhận các hành động của AI trong Antigravity.

## 🚀 Tính năng nổi bật
- **Auto Accept**: Tự động nhấn nút "Accept" sau một khoảng thời gian chờ (mặc định 2s).
- **Hẹn giờ (Timer)**: **(Mới)** Bật chế độ tự động trong X phút, sau đó sẽ tự động dừng để đảm bảo an toàn.
- **Phím tắt điều khiển từ xa**: Đăng ký các tổ hợp phím giúp server AntiBridge có thể điều hành AI từ bên ngoài.

---

## ⌨️ Các phím tắt (Shortcuts)

| Tổ hợp phím | Hành động |
|----------|--------|
| `Ctrl+Alt+Shift+H` | **Bật hẹn giờ Auto Accept** (Nhập số phút) |
| `Ctrl+Alt+Shift+T` | Bật/Tắt Auto Accept nhanh |
| `Ctrl+Alt+Shift+A` | Chấp nhận thủ công (Manual Accept) |
| `Ctrl+Alt+Shift+R` | Từ chối thủ công (Manual Reject) |
| `Ctrl+Alt+Shift+↑` | Tăng thời gian chờ (+500ms) |
| `Ctrl+Alt+Shift+↓` | Giảm thời gian chờ (-500ms) |

*Lưu ý: Trên máy Mac, tổ hợp phím sử dụng `Cmd` thay cho `Ctrl`.*

---

## 🛠 Cách cài đặt

1. Mở Antigravity.
2. Nhấn `Ctrl+Shift+P` (hoặc `Cmd+Shift+P` trên Mac).
3. Gõ "Extensions: Install from VSIX...".
4. Chọn file `.vsix` trong thư mục dự án này để cài đặt.

---

## ⚙️ Cài đặt tùy chỉnh (Settings)

Vào **File > Preferences > Settings** và tìm kiếm "AntiBridge":
- `antibridge.autoAcceptDelay`: Thời gian chờ giữa mỗi lần nhấn (ms).
- `antibridge.autoStartEnabled`: Tự động bật khi mở Antigravity.

---

## ⚠️ Cảnh báo an toàn
Chế độ **Auto Accept** sẽ đồng ý với **TẤT CẢ** các hành động của AI. Hãy chắc chắn bạn đang giám sát quá trình làm việc của AI hoặc sử dụng tính năng **Hẹn giờ** để tự động dừng sau một khoảng thời gian nhất định.
