# PowerShell startup script for Windows
# Run with: powershell -ExecutionPolicy Bypass -File start.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "    Logup - Full Stack Application" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Starting backend and frontend..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Backend will start on: " -NoNewline
Write-Host "http://localhost:8000" -ForegroundColor Green
Write-Host "Frontend will start on: " -NoNewline
Write-Host "http://localhost:3000" -ForegroundColor Green
Write-Host ""
Write-Host "Press Ctrl+C to stop both services" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

npm run dev:all

Read-Host "Press Enter to exit"
