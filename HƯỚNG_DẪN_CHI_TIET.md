# Hướng dẫn chi tiết: Auto Access cho các AI khác

Tính năng **"Auto Access"** hoạt động như một "robot bấm nút" giúp bạn.
Cứ mỗi 2 giây, nó sẽ thử bấm nút "Accept" (Chấp nhận) cho bạn.

Mặc định, nó chỉ biết bấm nút của **Antigrayvity**.
Nhưng bây giờ, bạn có thể **dạy nó bấm nút của các AI khác** (như GitHub Copilot, ChatGPT, v.v.).

## Cách làm (3 Bước)

### Bước 1: Tìm "Command ID" của AI bạn muốn
Command ID là "tên lệnh" mà máy tính hiểu. Để tìm nó:
1.  Trong VS Code, nhấn `Ctrl + K` sau đó `Ctrl + S` để mở **Keyboard Shortcuts**.
2.  Gõ tên hành động bạn muốn auto, ví dụ: "accept".
3.  Tìm dòng lệnh tương ứng (ví dụ của Copilot là `github.copilot.acceptInlineSuggestion`).
4.  Chuột phải vào dòng đó -> Chọn **Copy Command ID**.
    *(Lưu lại ID này để dùng ở bước 2)*

### Bước 2: Cấu hình Auto Access
1.  Mở **Settings** (Nhấn `Ctrl + ,`).
2.  Gõ tìm kiếm từ khóa: `antibridge`.
3.  Tìm mục **Antibridge: Additional Commands**.
4.  Nhấn nút **Add Item**.
5.  Dán **Command ID** bạn vừa copy ở Bước 1 vào.
6.  Nhấn **OK**.

### Bước 3: Kiểm tra
1.  Khởi động lại VS Code (để chắc chắn setting được nhận).
2.  Bật Auto Access (Nhấn `Ctrl + Alt + Shift + T`).
3.  Thử để AI khác gợi ý code -> Extension sẽ tự động "Accept" cho bạn!

## Ví dụ Command ID phổ biến
-   **GitHub Copilot (Inline)**: `editor.action.inlineSuggest.commit`
-   **IntelliSense**: `acceptSelectedSuggestion`
-   **Chat**: `workbench.action.chat.acceptInput`

---
*Mẹo: Nếu bạn không chắc chắn Command ID là gì, hãy thử tìm trong Keybindings (Bước 1) với từ khóa "accept" hoặc tên extension đó.*
