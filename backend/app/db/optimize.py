"""
Database optimization utilities for production.
"""

import logging
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

logger = logging.getLogger(__name__)

async def create_indexes(db: AsyncSession) -> None:
    """
    Create database indexes for performance optimization.
    This should be run during application startup in production.
    """
    try:
        # Create indexes for commonly queried columns
        indexes = [
            # User indexes
            "CREATE INDEX IF NOT EXISTS idx_user_email ON users (email)",
            "CREATE INDEX IF NOT EXISTS idx_user_created_at ON users (created_at)",
            
            # Job indexes
            "CREATE INDEX IF NOT EXISTS idx_job_title ON jobs (title)",
            "CREATE INDEX IF NOT EXISTS idx_job_company_name ON jobs (company_name)",
            "CREATE INDEX IF NOT EXISTS idx_job_created_at ON jobs (created_at)",
            "CREATE INDEX IF NOT EXISTS idx_job_location ON jobs (location)",
            
            # Job application indexes
            "CREATE INDEX IF NOT EXISTS idx_job_application_user_id ON job_applications (user_id)",
            "CREATE INDEX IF NOT EXISTS idx_job_application_job_id ON job_applications (job_id)",
            "CREATE INDEX IF NOT EXISTS idx_job_application_status ON job_applications (status)",
            "CREATE INDEX IF NOT EXISTS idx_job_application_created_at ON job_applications (created_at)",
            
            # Resume analysis indexes
            "CREATE INDEX IF NOT EXISTS idx_resume_analysis_user_id ON resume_analyses (user_id)",
            "CREATE INDEX IF NOT EXISTS idx_resume_analysis_job_id ON resume_analyses (job_id)",
            "CREATE INDEX IF NOT EXISTS idx_resume_analysis_overall_score ON resume_analyses (overall_score)",
            "CREATE INDEX IF NOT EXISTS idx_resume_analysis_created_at ON resume_analyses (created_at)",
        ]
        
        # Execute each index creation statement
        for index_sql in indexes:
            await db.execute(text(index_sql))
        
        await db.commit()
        logger.info("Database indexes created successfully")
    except Exception as e:
        await db.rollback()
        logger.error(f"Error creating database indexes: {str(e)}")
        raise

async def vacuum_analyze(db: AsyncSession) -> None:
    """
    Run VACUUM ANALYZE to update statistics and reclaim space.
    This should be run periodically in production.
    """
    try:
        # VACUUM ANALYZE requires a raw connection
        connection = await db.connection()
        raw_connection = connection.engine.raw_connection()
        
        # Disable autocommit for VACUUM
        await db.execute(text("SET autocommit = 0"))
        
        # Run VACUUM ANALYZE on important tables
        tables = [
            "users",
            "jobs",
            "job_applications",
            "resume_analyses",
            "skills",
            "job_skills"
        ]
        
        for table in tables:
            await db.execute(text(f"VACUUM ANALYZE {table}"))
        
        # Reset autocommit
        await db.execute(text("SET autocommit = 1"))
        
        logger.info("VACUUM ANALYZE completed successfully")
    except Exception as e:
        logger.error(f"Error running VACUUM ANALYZE: {str(e)}")
        raise

async def optimize_database(db: AsyncSession) -> None:
    """
    Run all database optimizations.
    """
    await create_indexes(db)
    await vacuum_analyze(db)
    logger.info("Database optimization completed")
