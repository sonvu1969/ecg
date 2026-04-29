@echo off
echo Đang dọn dẹp và cấu hình lại Git...

:: Xóa cấu hình remote cũ bị sai (USERNAME/REPO_NAME)
git remote remove origin

:: Thêm lại địa chỉ chuẩn của anh ./up.bat
git remote add origin https://github.com/sonvu1969/ecg.git

echo Đang chuẩn bị dữ liệu...
git add .
git commit -m "Cập nhật ứng dụng ECG chuẩn %date% %time%"

:: Đảm bảo dùng nhánh main
git branch -M main

echo Đang đẩy dữ liệu lên https://github.com/sonvu1969/ecg.git...
git push -u origin main --force

echo ------------------------------------------
echo XONG! Bây giờ anh hãy kiểm tra tại:
echo https://sonvu1969.github.io/ecg/
echo ------------------------------------------
pause