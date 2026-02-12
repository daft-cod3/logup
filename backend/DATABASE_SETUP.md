# Backend Setup

## Prerequisites
- Python 3.11+
- Virtualenv capability (`python -m venv`)

## Environment
1. Copy `.env` and adjust secrets:
   - `SECRET_KEY` should be a long random string.
   - `DATABASE_URL` defaults to SQLite: `sqlite:///./sql_app.db`.
   - Tune `ACCESS_TOKEN_EXPIRE_MINUTES` if needed.

## Install & Run
```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python init_db.py
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

On Windows you can also run `startup.bat`.

## API Overview
- `POST /auth/signup` — register user (`email`, `username`, `password`, `full_name?`)
- `POST /auth/login`  — OAuth2 password flow (`username`, `password`) returns Bearer token
- `GET  /auth/me`     — fetch current user, requires `Authorization: Bearer <token>`
- `GET  /health`      — health check

## Database
- Default is SQLite file `sql_app.db` in `backend/`.
- For Postgres (example):
  - `DATABASE_URL=postgresql+psycopg2://user:pass@localhost:5432/logup`
  - Ensure `psycopg2-binary` installed if using Postgres.
- Tables created via `python init_db.py`.
