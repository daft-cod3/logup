from datetime import datetime
import re
from typing import Optional

from pydantic import BaseModel, EmailStr, field_validator


class UserBase(BaseModel):
    email: EmailStr
    username: str
    full_name: Optional[str] = None


class UserCreate(UserBase):
    password: str

    @field_validator("password")
    @classmethod
    def validate_password_strength(cls, value: str) -> str:
        if len(value.encode("utf-8")) > 72:
            raise ValueError("Password is too long (bcrypt max is 72 bytes)")
        # Strong password: uppercase + lowercase + number, minimum 8 chars.
        if len(value) < 8:
            raise ValueError("Password must be at least 8 characters long")
        if not re.search(r"[A-Z]", value):
            raise ValueError("Password must include at least one uppercase letter (A-Z)")
        if not re.search(r"[a-z]", value):
            raise ValueError("Password must include at least one lowercase letter (a-z)")
        if not re.search(r"[0-9]", value):
            raise ValueError("Password must include at least one number (0-9)")
        return value


class UserLogin(BaseModel):
    username: str
    password: str


class UserOut(UserBase):
    id: str
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class TokenData(BaseModel):
    user_id: Optional[str] = None
