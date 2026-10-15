@echo off
title Push to GitHub - Abirami Birthday Surprise
color 0D
cls
echo ===================================================
echo     PUSH ABIRAMI BIRTHDAY SURPRISE TO GITHUB
echo ===================================================
echo.
echo Target Repository: https://github.com/gowthamkrizz/bday-.git
echo Total project files: 33 files (only 4.4 MB)
echo.
echo [1/3] Setting remote repository origin...
git remote remove origin 2>nul
git remote add origin https://github.com/gowthamkrizz/bday-.git

echo [2/3] Setting main branch...
git branch -M main

echo [3/3] Pushing to GitHub...
echo (If a GitHub sign-in window pops up in your browser, click "Authorize")
echo.
git push -u origin main --force

echo.
if %ERRORLEVEL% equ 0 (
    echo ===================================================
    echo   SUCCESS! All files are now live on GitHub!
    echo   View here: https://github.com/gowthamkrizz/bday-
    echo ===================================================
) else (
    echo ===================================================
    echo   If GitHub asked for authentication, please sign in
    echo   and run this file again!
    echo ===================================================
)
echo.
pause
