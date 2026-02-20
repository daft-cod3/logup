from datetime import timedelta

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from ..core.config import settings
from ..core.security import create_access_token
from ..schemas.auth import Token, UserCreate, UserLogin
from . import user_service


def signup(db: Session, user_in: UserCreate):
    if user_service.get_user_by_email(db, user_in.email):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
    if user_service.get_user_by_username(db, user_in.username):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Username already registered")
    return user_service.create_user(db, user_in)


def login(db: Session, credentials: UserLogin) -> Token:
    user = user_service.authenticate_user(db, credentials.username, credentials.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid username or password")

    access_token_expires = timedelta(minutes=settings.access_token_expire_minutes)
    token = create_access_token(subject=user.id, expires_delta=access_token_expires)
    return Token(access_token=token, token_type="bearer")
