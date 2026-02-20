from datetime import timedelta
import re

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from ..core.config import settings
from ..core.security import create_access_token
from ..schemas.auth import Token, UserCreate, UserLogin
from . import user_service


def _validate_password_strength(password: str, username: str | None = None):
    if len(password.encode("utf-8")) > 72:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Password is too long (bcrypt max is 72 bytes)")
    if len(password) < 8:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Password must be at least 8 characters long")
    if username and password == username:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Password must not be the same as the username")
    if not re.search(r"[A-Z]", password):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Password must contain at least one uppercase letter")
    if not re.search(r"[a-z]", password):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Password must contain at least one lowercase letter")
    if not re.search(r"[0-9]", password):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Password must contain at least one number")


def signup(db: Session, user_in: UserCreate):
    # validate unique email/username first
    if user_service.get_user_by_email(db, user_in.email):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
    if user_service.get_user_by_username(db, user_in.username):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Username already registered")

    # server-side password strength validation
    _validate_password_strength(user_in.password, user_in.username)

    return user_service.create_user(db, user_in)


def login(db: Session, credentials: UserLogin) -> Token:
    user = user_service.authenticate_user(db, credentials.username, credentials.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid username or password")

    access_token_expires = timedelta(minutes=settings.access_token_expire_minutes)
    token = create_access_token(subject=user.id, expires_delta=access_token_expires)
    return Token(access_token=token, token_type="bearer")
