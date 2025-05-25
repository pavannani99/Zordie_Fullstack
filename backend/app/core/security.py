from datetime import datetime, timedelta
from typing import Any, Dict, Optional, Union

from jose import jwt
from passlib.context import CryptContext

from app.core.config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

ALGORITHM = "HS256"


def create_access_token(
    subject: Union[str, Any], expires_delta: Optional[timedelta] = None
) -> str:
    """Create an access token with the given subject and expiration time"""
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(
            minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
        )
    to_encode = {"exp": expire, "sub": str(subject), "type": "access"}
    encoded_jwt = jwt.encode(to_encode, settings.ACCESS_TOKEN_SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def create_refresh_token(
    subject: Union[str, Any], expires_delta: Optional[timedelta] = None
) -> str:
    """Create a refresh token with the given subject and expiration time"""
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(
            days=settings.REFRESH_TOKEN_EXPIRE_DAYS
        )
    to_encode = {"exp": expire, "sub": str(subject), "type": "refresh"}
    encoded_jwt = jwt.encode(to_encode, settings.REFRESH_TOKEN_SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def verify_token(token: str, secret_key: str, token_type: str) -> Optional[Dict[str, Any]]:
    """Verify a token and return its payload if valid"""
    try:
        payload = jwt.decode(token, secret_key, algorithms=[ALGORITHM])
        if payload.get("type") != token_type:
            return None
        return payload
    except jwt.JWTError:
        return None


def verify_access_token(token: str) -> Optional[Dict[str, Any]]:
    """Verify an access token and return its payload if valid"""
    return verify_token(token, settings.ACCESS_TOKEN_SECRET_KEY, "access")


def verify_refresh_token(token: str) -> Optional[Dict[str, Any]]:
    """Verify a refresh token and return its payload if valid"""
    return verify_token(token, settings.REFRESH_TOKEN_SECRET_KEY, "refresh")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against its hash"""
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    """Hash a password"""
    return pwd_context.hash(password)
