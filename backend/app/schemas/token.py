from typing import Optional
from pydantic import BaseModel, EmailStr


class Token(BaseModel):
    access_token: str
    refresh_token: Optional[str] = None
    token_type: str
    user_id: Optional[int] = None
    email: Optional[EmailStr] = None
    full_name: Optional[str] = None


class TokenPayload(BaseModel):
    sub: Optional[int] = None
    type: Optional[str] = None
    exp: Optional[int] = None


class TokenRefresh(BaseModel):
    refresh_token: str
