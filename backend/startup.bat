@echo off
setlocal
cd /d %~dp0

set PORT=%1
if "%PORT%"=="" set PORT=8001

if not exist .venv (
    python -m venv .venv
)
call .venv\Scripts\activate

pip install -r requirements.txt
python init_db.py
echo Starting backend on http://localhost:%PORT% ...
uvicorn app.main:app --reload --host 127.0.0.1 --port %PORT%
endlocal
