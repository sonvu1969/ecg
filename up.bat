@echo off
echo Đang kiểm tra cấu hình Git cho dự án ECG...

:: Khởi tạo nếu thư mục chưa có Git
if not exist .git (
    git init
    git branch -M main
    :: Cấu hình đúng địa chỉ repository của anh
    git remote add origin https://github.com/sonvu1969/ecg.git
)

echo Đang chuẩn bị đẩy dữ liệu mới...
:: Thêm tất cả các file (index.html, manifest.json, v.v.)
git add .
git commit -m "Cập nhật ứng dụng ECG %date% %time%"

:: Đảm bảo đẩy vào nhánh main
git branch -M main

echo Đang đẩy dữ liệu lên GitHub Pages...
:: Lệnh push này sẽ ghi đè bản cũ bằng bản mới nhất từ VS Code
git push -u origin main --force

echo ------------------------------------------
echo XONG! Trang web của anh đã được cập nhật tại:
echo https://sonvu1969.github.io/ecg/
echo ------------------------------------------
pause