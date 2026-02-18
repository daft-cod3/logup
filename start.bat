@echo off
REM This script starts both the backend and frontend in Windows

echo ========================================
echo    Logup - Full Stack Application
echo ========================================
echo.
echo Starting backend and frontend...
echo.
echo Backend will start on: http://localhost:8000
echo Frontend will start on: http://localhost:3000
echo.
echo Press Ctrl+C to stop both services
echo ========================================
echo.

npm run dev:all

pause
