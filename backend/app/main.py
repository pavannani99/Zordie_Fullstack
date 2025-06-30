import logging
import time
import asyncio
from fastapi import FastAPI, Request, status, Depends
from starlette.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession
from app.api.v1.api import api_router
from app.core.config import settings
from app.middleware.auth import AuthLoggingMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from app.db.session import get_db
from app.db.optimize import optimize_database
from app.utils.storage import StorageManager, UPLOAD_DIR, OUTPUT_DIR

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    handlers=[
        logging.StreamHandler(),
        logging.FileHandler("app.log"),
    ]
)
logger = logging.getLogger(__name__)

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Zodie API - AI STARTUP",
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json" if settings.ENVIRONMENT != "production" else None,
    docs_url=None if settings.ENVIRONMENT == "production" else "/docs",
    redoc_url=None if settings.ENVIRONMENT == "production" else "/redoc"
)

# Set up CORS with proper settings for production
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type", "Accept"],
    max_age=600  # Cache preflight requests for 10 minutes
)

# Request timing middleware for performance monitoring
class TimingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        start_time = time.time()
        response = await call_next(request)
        process_time = time.time() - start_time
        response.headers["X-Process-Time"] = str(process_time)
        logger.info(f"Request to {request.url.path} took {process_time:.4f} seconds")
        return response

# Add custom middleware
app.add_middleware(AuthLoggingMiddleware)
app.add_middleware(TimingMiddleware)

# Exception handlers
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    # Log the exception
    logger.error(f"Unhandled exception: {str(exc)}", exc_info=True)
    
    # In production, don't expose detailed error messages
    if settings.ENVIRONMENT == "production":
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"detail": "Internal server error"},
        )
    else:
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"detail": f"Internal server error: {str(exc)}"},
        )

# Include API router
app.include_router(api_router, prefix=settings.API_V1_STR)

# Root endpoint
@app.get("/")
async def root():
    return {
        "message": "Welcome to Zodie API",
        "version": "1.0.0",
        "docs": "/docs"
    }

# Health check endpoint
@app.get("/health")
async def health_check(db: AsyncSession = Depends(get_db)):
    # Add more detailed health checks
    health_status = {
        "status": "healthy",
        "version": settings.VERSION,
        "environment": settings.ENVIRONMENT,
        "timestamp": time.time(),
        "components": {
            "database": "healthy",
            "storage": "healthy"
        }
    }
    
    # Check database connection
    try:
        await db.execute("SELECT 1")
    except Exception as e:
        logger.error(f"Database health check failed: {str(e)}")
        health_status["components"]["database"] = "unhealthy"
        health_status["status"] = "degraded"
    
    # Check storage directories
    if not UPLOAD_DIR.exists() or not OUTPUT_DIR.exists():
        logger.error("Storage directories check failed")
        health_status["components"]["storage"] = "unhealthy"
        health_status["status"] = "degraded"
    
    return health_status


@app.on_event("startup")
async def startup_event():
    """Run startup tasks when the application starts."""
    logger.info(f"Starting {settings.PROJECT_NAME} API in {settings.ENVIRONMENT} environment")
    
    # Ensure directories exist
    UPLOAD_DIR.mkdir(exist_ok=True, parents=True)
    OUTPUT_DIR.mkdir(exist_ok=True, parents=True)
    
    # Run database optimizations in production
    if settings.ENVIRONMENT == "production":
        try:
            # Get a database session
            async for db in get_db():
                # Create indexes and optimize database
                await optimize_database(db)
                break
            
            logger.info("Database optimization completed during startup")
        except Exception as e:
            logger.error(f"Database optimization failed: {str(e)}")


@app.on_event("shutdown")
async def shutdown_event():
    """Run cleanup tasks when the application shuts down."""
    logger.info(f"Shutting down {settings.PROJECT_NAME} API")
    
    # Clean up any resources if needed
    try:
        # Run a quick cleanup of temporary files
        storage_manager = StorageManager()
        await storage_manager.cleanup_old_files(UPLOAD_DIR, 30)  # Clean files older than 30 days
        
        logger.info("Cleanup completed during shutdown")
    except Exception as e:
        logger.error(f"Cleanup failed during shutdown: {str(e)}")
