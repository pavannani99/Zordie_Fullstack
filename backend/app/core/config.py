import secrets
from typing import Any, Dict, List, Optional, Union

from pydantic import AnyHttpUrl, PostgresDsn, validator
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    
    # Token settings
    ACCESS_TOKEN_SECRET_KEY: str
    REFRESH_TOKEN_SECRET_KEY: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    
    # Project settings
    PROJECT_NAME: str = "Zodie"
    
    # Clerk Authentication
    CLERK_SECRET_KEY: str
    
    # CORS configuration
    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = ["http://localhost:5173"]

    @validator("BACKEND_CORS_ORIGINS", pre=True)
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> Union[List[str], str]:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, (list, str)):
            return v
        raise ValueError(v)

    # Database configuration
    DATABASE_URL: str

    class Config:
        case_sensitive = True
        env_file = ".env"


settings = Settings()
