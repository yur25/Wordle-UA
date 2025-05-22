@echo off
cd /d "%~dp0src"
echo Запуск node server.js
start "" /B node server.js

cd /d "%~dp0"
echo Запуск gulp
gulp
echo Вдалося
pause
