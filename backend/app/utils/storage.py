"""
Storage utility for handling file uploads and storage.
Supports both local storage and cloud storage (AWS S3).
"""

import os
import time
import shutil
import uuid
from pathlib import Path
from typing import Optional, List, BinaryIO, Dict, Any, Union
from datetime import datetime, timedelta
import logging
import asyncio
from fastapi import UploadFile, HTTPException, status

from app.core.config import settings

# Import S3 storage manager if available
try:
    from app.utils.s3_storage import S3StorageManager
    S3_AVAILABLE = True
except ImportError:
    S3_AVAILABLE = False

# Configure logging
logger = logging.getLogger(__name__)

# Define paths
UPLOAD_DIR = Path("./uploads")
OUTPUT_DIR = Path("./output")

# Ensure directories exist
UPLOAD_DIR.mkdir(exist_ok=True)
OUTPUT_DIR.mkdir(exist_ok=True)


class StorageManager:
    """
    Storage manager for handling file uploads and storage.
    Supports both local storage and cloud storage (AWS S3).
    """
    
    def __init__(self):
        """Initialize the storage manager based on configuration."""
        self.storage_type = settings.STORAGE_TYPE
        self.s3_manager = None
        
        # Initialize S3 manager if configured
        if self.storage_type == "s3" and S3_AVAILABLE:
            self.s3_manager = S3StorageManager()
            if not self.s3_manager.initialized:
                logger.warning("S3 storage manager not initialized properly. Falling back to local storage.")
                self.storage_type = "local"
        elif self.storage_type == "s3" and not S3_AVAILABLE:
            logger.warning("S3 storage type configured but S3 manager not available. Falling back to local storage.")
            self.storage_type = "local"
    
    async def save_file(self, file: UploadFile, directory: Path, filename: str) -> Union[Path, str]:
        """
        Save a file to the specified directory with the given filename.
        
        Args:
            file: The uploaded file
            directory: The directory to save the file to
            filename: The filename to save the file as
            
        Returns:
            Path to the saved file (local) or URL (S3)
        """
        # Ensure directory exists for local storage
        if isinstance(directory, Path):
            directory.mkdir(exist_ok=True, parents=True)
        
        # Determine storage type
        if self.storage_type == "s3" and self.s3_manager:
            try:
                # Save to S3
                s3_directory = str(directory).replace('\\', '/').replace('./', '')
                s3_url = await self.s3_manager.save_upload_file(
                    file, 
                    directory=s3_directory,
                    filename=filename
                )
                logger.info(f"File saved to S3: {s3_url}")
                return s3_url
            except Exception as e:
                logger.error(f"Error saving file to S3: {str(e)}. Falling back to local storage.")
                # Fall back to local storage
                file_path = directory / filename
                await file.seek(0)
                with open(file_path, "wb") as buffer:
                    shutil.copyfileobj(file.file, buffer)
                logger.info(f"File saved locally at {file_path} (S3 fallback)")
                return file_path
        else:
            # Save locally
            file_path = directory / filename
            with open(file_path, "wb") as buffer:
                shutil.copyfileobj(file.file, buffer)
            logger.info(f"File saved locally at {file_path}")
            return file_path
    
    async def get_file(self, file_path: Union[Path, str]) -> Optional[bytes]:
        """
        Get a file from storage.
        
        Args:
            file_path: Path to the file (local) or S3 key (S3)
            
        Returns:
            File contents as bytes, or None if file not found
        """
        # Check if this is an S3 URL
        if isinstance(file_path, str) and file_path.startswith('http'):
            if self.storage_type == "s3" and self.s3_manager:
                # Extract S3 key from URL
                s3_key = file_path.split(f"{settings.AWS_BUCKET_NAME}.s3.{settings.AWS_REGION}.amazonaws.com/")[1]
                
                # Create a temporary file to download to
                temp_path = Path(f"./temp_{uuid.uuid4()}.tmp")
                try:
                    # Download from S3
                    success = await self.s3_manager.download_file(s3_key, temp_path)
                    if success:
                        with open(temp_path, "rb") as f:
                            content = f.read()
                        # Clean up temp file
                        temp_path.unlink()
                        return content
                    else:
                        logger.warning(f"Failed to download file from S3: {s3_key}")
                        return None
                except Exception as e:
                    logger.error(f"Error getting file from S3: {str(e)}")
                    if temp_path.exists():
                        temp_path.unlink()
                    return None
            else:
                logger.warning(f"S3 URL provided but S3 storage not configured: {file_path}")
                return None
        else:
            # Handle local file
            if isinstance(file_path, str):
                file_path = Path(file_path)
                
            if not file_path.exists():
                logger.warning(f"File not found: {file_path}")
                return None
            
            with open(file_path, "rb") as f:
                return f.read()
    
    async def delete_file(self, file_path: Union[Path, str]) -> bool:
        """
        Delete a file from storage.
        
        Args:
            file_path: Path to the file (local) or S3 URL/key (S3)
            
        Returns:
            True if file was deleted, False otherwise
        """
        # Check if this is an S3 URL
        if isinstance(file_path, str) and file_path.startswith('http'):
            if self.storage_type == "s3" and self.s3_manager:
                # Extract S3 key from URL
                s3_key = file_path.split(f"{settings.AWS_BUCKET_NAME}.s3.{settings.AWS_REGION}.amazonaws.com/")[1]
                
                # Delete from S3
                return await self.s3_manager.delete_file(s3_key)
            else:
                logger.warning(f"S3 URL provided but S3 storage not configured: {file_path}")
                return False
        else:
            # Handle local file
            try:
                if isinstance(file_path, str):
                    file_path = Path(file_path)
                    
                if file_path.exists():
                    file_path.unlink()
                    logger.info(f"Deleted file: {file_path}")
                    return True
                else:
                    logger.warning(f"File not found for deletion: {file_path}")
                    return False
            except Exception as e:
                logger.error(f"Error deleting file {file_path}: {str(e)}")
                return False
    
    async def cleanup_old_files(self, directory: Union[Path, str], days: int = 7) -> int:
        """
        Clean up files older than the specified number of days.
        
        Args:
            directory: Directory to clean up (local) or prefix (S3)
            days: Number of days to keep files
            
        Returns:
            Number of files deleted
        """
        # Handle S3 storage
        if self.storage_type == "s3" and self.s3_manager:
            # Convert directory to S3 prefix
            if isinstance(directory, Path):
                prefix = str(directory).replace('\\', '/').replace('./', '')
            else:
                prefix = directory
                
            # Clean up S3 files
            return await self.s3_manager.cleanup_old_files(prefix, days)
        else:
            # Handle local storage
            if isinstance(directory, str):
                directory = Path(directory)
                
            if not directory.exists():
                logger.warning(f"Directory not found for cleanup: {directory}")
                return 0
            
            count = 0
            cutoff_time = time.time() - (days * 24 * 60 * 60)
            
            for file_path in directory.glob("**/*"):
                if file_path.is_file() and file_path.stat().st_mtime < cutoff_time:
                    try:
                        file_path.unlink()
                        count += 1
                        logger.info(f"Cleaned up old file: {file_path}")
                    except Exception as e:
                        logger.error(f"Error cleaning up file {file_path}: {str(e)}")
            
            logger.info(f"Cleaned up {count} old files from {directory}")
            return count


    async def get_file_url(self, file_path: Union[Path, str]) -> Optional[str]:
        """
        Get a URL for accessing a file.
        For S3, this generates a presigned URL.
        For local storage, this returns the file path.
        
        Args:
            file_path: Path to the file (local) or S3 key/URL (S3)
            
        Returns:
            URL to access the file, or None if error
        """
        # Check if this is already an S3 URL
        if isinstance(file_path, str) and file_path.startswith('http'):
            if self.storage_type == "s3" and self.s3_manager:
                # Extract S3 key from URL
                s3_key = file_path.split(f"{settings.AWS_BUCKET_NAME}.s3.{settings.AWS_REGION}.amazonaws.com/")[1]
                
                # Generate presigned URL
                return await self.s3_manager.get_file_url(s3_key)
            else:
                logger.warning(f"S3 URL provided but S3 storage not configured: {file_path}")
                return None
        else:
            # Handle local file or S3 key
            if self.storage_type == "s3" and self.s3_manager:
                # Treat as S3 key
                s3_key = file_path
                if isinstance(s3_key, Path):
                    s3_key = str(s3_key).replace('\\', '/').replace('./', '')
                
                # Generate presigned URL
                return await self.s3_manager.get_file_url(s3_key)
            else:
                # Return local path
                if isinstance(file_path, Path):
                    return str(file_path)
                return file_path

# Create a background task for file cleanup
async def cleanup_task():
    """Background task to clean up old files periodically."""
    while True:
        try:
            logger.info("Running scheduled file cleanup task")
            storage_manager = StorageManager()
            
            # Clean up upload directory
            upload_count = await storage_manager.cleanup_old_files(
                UPLOAD_DIR, 
                settings.TEMP_FILE_RETENTION_DAYS
            )
            
            # Clean up output directory
            output_count = await storage_manager.cleanup_old_files(
                OUTPUT_DIR, 
                settings.TEMP_FILE_RETENTION_DAYS
            )
            
            logger.info(f"Cleanup task completed: removed {upload_count + output_count} files")
        except Exception as e:
            logger.error(f"Error in cleanup task: {str(e)}")
        
        # Sleep for 24 hours
        await asyncio.sleep(24 * 60 * 60)


# Function to migrate files from local storage to S3
async def migrate_to_s3(directory: Path, delete_after: bool = False) -> Dict[str, Any]:
    """
    Migrate files from local storage to S3.
    
    Args:
        directory: Directory containing files to migrate
        delete_after: Whether to delete local files after migration
        
    Returns:
        Migration statistics
    """
    if not S3_AVAILABLE:
        return {"status": "error", "message": "S3 storage manager not available"}
    
    stats = {
        "total_files": 0,
        "migrated_files": 0,
        "failed_files": 0,
        "deleted_files": 0,
        "errors": []
    }
    
    try:
        # Initialize storage managers
        s3_manager = S3StorageManager()
        
        if not s3_manager.initialized:
            return {"status": "error", "message": "S3 storage manager not initialized"}
        
        # Ensure directory exists
        if not directory.exists():
            return {"status": "error", "message": f"Directory not found: {directory}"}
        
        # Get all files in the directory
        files = list(directory.glob("**/*"))
        stats["total_files"] = len(files)
        
        # Migrate each file
        for file_path in files:
            if file_path.is_file():
                try:
                    # Create S3 key from relative path
                    rel_path = file_path.relative_to(directory)
                    s3_key = str(rel_path).replace('\\', '/')
                    
                    # Upload to S3
                    s3_url = await s3_manager.upload_file(file_path, s3_key)
                    
                    if s3_url:
                        stats["migrated_files"] += 1
                        
                        # Delete local file if requested
                        if delete_after:
                            file_path.unlink()
                            stats["deleted_files"] += 1
                    else:
                        stats["failed_files"] += 1
                        stats["errors"].append(f"Failed to upload {file_path}")
                except Exception as e:
                    stats["failed_files"] += 1
                    stats["errors"].append(f"Error migrating {file_path}: {str(e)}")
        
        return {"status": "success", **stats}
    except Exception as e:
        return {"status": "error", "message": str(e), **stats}
