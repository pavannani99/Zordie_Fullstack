import secrets
import os
from typing import Any, Dict, List, Optional, Union

from pydantic import AnyHttpUrl, PostgresDsn, validator, field_validator
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # API settings
    API_V1_STR: str = "/api/v1"
    VERSION: str = "1.0.0"
    ENVIRONMENT: str = "development"
    
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
    
    # File storage settings
    STORAGE_TYPE: str = "local"  # Options: local, s3
    MAX_UPLOAD_SIZE: int = 5 * 1024 * 1024  # 5MB
    
    # AWS S3 settings (for production)
    AWS_ACCESS_KEY_ID: Optional[str] = None
    AWS_SECRET_ACCESS_KEY: Optional[str] = None
    AWS_REGION: Optional[str] = None
    AWS_BUCKET_NAME: Optional[str] = None
    
    # Database settings
    DATABASE_URL: str
    DATABASE_MAX_CONNECTIONS: int = 10
    DATABASE_POOL_SIZE: int = 5
    
    # Logging settings
    LOG_LEVEL: str = "INFO"
    
    # Rate limiting
    RATE_LIMIT_MAX_REQUESTS: int = 100
    RATE_LIMIT_WINDOW_SECONDS: int = 60

    @field_validator("BACKEND_CORS_ORIGINS", mode="before")
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> Union[List[str], str]:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, (list, str)):
            return v
        raise ValueError(v)
        
    @field_validator("ENVIRONMENT", mode="before")
    def validate_environment(cls, v: str) -> str:
        allowed_environments = ["development", "testing", "staging", "production"]
        if v.lower() not in allowed_environments:
            raise ValueError(f"Environment must be one of {allowed_environments}")
        return v.lower()

    # Cleanup settings
    TEMP_FILE_RETENTION_DAYS: int = 7  # Days to keep temporary files before cleanup

    class Config:
        case_sensitive = True
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()
