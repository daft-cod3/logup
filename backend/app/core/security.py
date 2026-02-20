import datetime
from typing import Optional

import bcrypt
from jose import JWTError, jwt

from .config import settings

def verify_password(plain_password: str, hashed_password: str) -> bool:
    # bcrypt 5+ enforces the 72-byte limit, so keep verification defensive.
    try:
        return bcrypt.checkpw(
            plain_password.encode("utf-8"),
            hashed_password.encode("utf-8"),
        )
    except ValueError:
        return False


def get_password_hash(password: str) -> str:
    hashed = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
    return hashed.decode("utf-8")


def create_access_token(subject: str, expires_delta: Optional[datetime.timedelta] = None) -> str:
    expire = datetime.datetime.now() + (expires_delta or datetime.timedelta(minutes=settings.access_token_expire_minutes))
    to_encode = {"sub": subject, "exp": expire}
    return jwt.encode(to_encode, settings.secret_key, algorithm=settings.algorithm)


def decode_access_token(token: str) -> str:
    try:
        payload = jwt.decode(token, settings.secret_key, algorithms=[settings.algorithm])
        subject: str = payload.get("sub")
        if subject is None:
            raise JWTError("Missing subject")
        return subject
    except JWTError as exc:
        raise JWTError("Invalid token") from exc
