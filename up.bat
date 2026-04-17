@echo off
echo Đang kiểm tra Git...

:: Khởi tạo nếu thư mục chưa có Git
if not exist .git (
    git init
    git remote add origin https://github.com/USERNAME/REPO_NAME.git
)

echo Đang chuẩn bị đẩy dữ liệu...
git add .
git commit -m "Update 3D Ultrasound %date% %time%"

echo Đang đẩy lên nhánh chính...
git push origin main --force

echo ------------------------------------------
echo XONG! Web của anh sẽ chạy tại:
echo https://USERNAME.github.io/REPO_NAME/
echo ------------------------------------------
pause