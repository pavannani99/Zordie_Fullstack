"""
AWS S3 storage utility for handling file uploads and storage in production.
This module provides a complete S3 integration for the Zodie backend.
"""

import os
import logging
import time
import uuid
from pathlib import Path
from typing import Optional, List, BinaryIO, Dict, Any, Union
import asyncio
import boto3
from botocore.exceptions import ClientError
from fastapi import UploadFile, HTTPException, status

from app.core.config import settings

# Configure logging
logger = logging.getLogger(__name__)

class S3StorageManager:
    """
    AWS S3 storage manager for handling file uploads and storage.
    This class provides a complete interface for interacting with S3.
    """
    
    def __init__(self):
        """Initialize the S3 storage manager with AWS credentials."""
        self.initialized = False
        self.s3_client = None
        self.bucket_name = None
        
        # Check if AWS credentials are configured
        if (settings.AWS_ACCESS_KEY_ID and 
            settings.AWS_SECRET_ACCESS_KEY and 
            settings.AWS_REGION and 
            settings.AWS_BUCKET_NAME):
            
            try:
                # Initialize S3 client
                self.s3_client = boto3.client(
                    's3',
                    aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                    aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
                    region_name=settings.AWS_REGION
                )
                self.bucket_name = settings.AWS_BUCKET_NAME
                self.initialized = True
                logger.info(f"S3 storage manager initialized for bucket: {self.bucket_name}")
            except Exception as e:
                logger.error(f"Failed to initialize S3 client: {str(e)}")
        else:
            logger.warning("S3 storage manager not initialized due to missing AWS credentials")
    
    async def _ensure_initialized(self) -> None:
        """Ensure that the S3 client is initialized."""
        if not self.initialized:
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="S3 storage is not configured"
            )
    
    async def upload_file(self, 
                         file_path: Union[str, Path], 
                         s3_key: str, 
                         extra_args: Optional[Dict[str, Any]] = None) -> str:
        """
        Upload a file to S3.
        
        Args:
            file_path: Path to the local file
            s3_key: S3 object key (path in the bucket)
            extra_args: Extra arguments for S3 upload (e.g., ContentType)
            
        Returns:
            S3 URL of the uploaded file
        """
        await self._ensure_initialized()
        
        try:
            # Convert Path to string if needed
            if isinstance(file_path, Path):
                file_path = str(file_path)
            
            # Set default extra args if not provided
            if extra_args is None:
                extra_args = {}
            
            # Upload the file
            self.s3_client.upload_file(
                file_path,
                self.bucket_name,
                s3_key,
                ExtraArgs=extra_args
            )
            
            # Generate the S3 URL
            s3_url = f"https://{self.bucket_name}.s3.{settings.AWS_REGION}.amazonaws.com/{s3_key}"
            logger.info(f"Uploaded file to S3: {s3_key}, URL: {s3_url}")
            
            return s3_url
        except ClientError as e:
            logger.error(f"Error uploading file to S3: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Error uploading file to S3: {str(e)}"
            )
    
    async def upload_fileobj(self, 
                           file_obj: BinaryIO, 
                           s3_key: str, 
                           extra_args: Optional[Dict[str, Any]] = None) -> str:
        """
        Upload a file-like object to S3.
        
        Args:
            file_obj: File-like object to upload
            s3_key: S3 object key (path in the bucket)
            extra_args: Extra arguments for S3 upload (e.g., ContentType)
            
        Returns:
            S3 URL of the uploaded file
        """
        await self._ensure_initialized()
        
        try:
            # Set default extra args if not provided
            if extra_args is None:
                extra_args = {}
            
            # Upload the file object
            self.s3_client.upload_fileobj(
                file_obj,
                self.bucket_name,
                s3_key,
                ExtraArgs=extra_args
            )
            
            # Generate the S3 URL
            s3_url = f"https://{self.bucket_name}.s3.{settings.AWS_REGION}.amazonaws.com/{s3_key}"
            logger.info(f"Uploaded file object to S3: {s3_key}, URL: {s3_url}")
            
            return s3_url
        except ClientError as e:
            logger.error(f"Error uploading file object to S3: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Error uploading file object to S3: {str(e)}"
            )
    
    async def save_upload_file(self, 
                             upload_file: UploadFile, 
                             directory: str = "uploads",
                             filename: Optional[str] = None) -> str:
        """
        Save an uploaded file directly to S3.
        
        Args:
            upload_file: The uploaded file from FastAPI
            directory: Directory in the S3 bucket
            filename: Optional filename (if not provided, a UUID will be generated)
            
        Returns:
            S3 URL of the uploaded file
        """
        await self._ensure_initialized()
        
        try:
            # Generate filename if not provided
            if filename is None:
                file_ext = os.path.splitext(upload_file.filename)[1].lower()
                filename = f"{uuid.uuid4()}{file_ext}"
            
            # Create S3 key
            s3_key = f"{directory}/{filename}"
            
            # Determine content type
            content_type = upload_file.content_type
            
            # Upload the file
            await upload_file.seek(0)
            file_content = await upload_file.read()
            
            # Create extra args with content type
            extra_args = {"ContentType": content_type}
            
            # Upload using file object
            import io
            file_obj = io.BytesIO(file_content)
            
            s3_url = await self.upload_fileobj(file_obj, s3_key, extra_args)
            
            return s3_url
        except Exception as e:
            logger.error(f"Error saving uploaded file to S3: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Error saving uploaded file to S3: {str(e)}"
            )
    
    async def download_file(self, s3_key: str, local_path: Union[str, Path]) -> bool:
        """
        Download a file from S3.
        
        Args:
            s3_key: S3 object key (path in the bucket)
            local_path: Path to save the file locally
            
        Returns:
            True if successful, False otherwise
        """
        await self._ensure_initialized()
        
        try:
            # Convert Path to string if needed
            if isinstance(local_path, Path):
                local_path = str(local_path)
            
            # Ensure the directory exists
            os.makedirs(os.path.dirname(local_path), exist_ok=True)
            
            # Download the file
            self.s3_client.download_file(
                self.bucket_name,
                s3_key,
                local_path
            )
            
            logger.info(f"Downloaded file from S3: {s3_key} to {local_path}")
            return True
        except ClientError as e:
            logger.error(f"Error downloading file from S3: {str(e)}")
            return False
    
    async def get_file_url(self, s3_key: str, expiration: int = 3600) -> Optional[str]:
        """
        Generate a presigned URL for an S3 object.
        
        Args:
            s3_key: S3 object key (path in the bucket)
            expiration: URL expiration time in seconds (default: 1 hour)
            
        Returns:
            Presigned URL or None if error
        """
        await self._ensure_initialized()
        
        try:
            # Generate presigned URL
            url = self.s3_client.generate_presigned_url(
                'get_object',
                Params={
                    'Bucket': self.bucket_name,
                    'Key': s3_key
                },
                ExpiresIn=expiration
            )
            
            logger.info(f"Generated presigned URL for {s3_key}")
            return url
        except ClientError as e:
            logger.error(f"Error generating presigned URL: {str(e)}")
            return None
    
    async def delete_file(self, s3_key: str) -> bool:
        """
        Delete a file from S3.
        
        Args:
            s3_key: S3 object key (path in the bucket)
            
        Returns:
            True if successful, False otherwise
        """
        await self._ensure_initialized()
        
        try:
            # Delete the object
            self.s3_client.delete_object(
                Bucket=self.bucket_name,
                Key=s3_key
            )
            
            logger.info(f"Deleted file from S3: {s3_key}")
            return True
        except ClientError as e:
            logger.error(f"Error deleting file from S3: {str(e)}")
            return False
    
    async def list_files(self, prefix: str = "", max_keys: int = 1000) -> List[Dict[str, Any]]:
        """
        List files in an S3 bucket with a given prefix.
        
        Args:
            prefix: S3 key prefix (directory)
            max_keys: Maximum number of keys to return
            
        Returns:
            List of file information dictionaries
        """
        await self._ensure_initialized()
        
        try:
            # List objects
            response = self.s3_client.list_objects_v2(
                Bucket=self.bucket_name,
                Prefix=prefix,
                MaxKeys=max_keys
            )
            
            # Extract file information
            files = []
            if 'Contents' in response:
                for obj in response['Contents']:
                    files.append({
                        'key': obj['Key'],
                        'size': obj['Size'],
                        'last_modified': obj['LastModified'],
                        'url': f"https://{self.bucket_name}.s3.{settings.AWS_REGION}.amazonaws.com/{obj['Key']}"
                    })
            
            logger.info(f"Listed {len(files)} files with prefix {prefix}")
            return files
        except ClientError as e:
            logger.error(f"Error listing files in S3: {str(e)}")
            return []
    
    async def cleanup_old_files(self, prefix: str = "", days: int = 7) -> int:
        """
        Clean up files older than the specified number of days.
        
        Args:
            prefix: S3 key prefix (directory)
            days: Number of days to keep files
            
        Returns:
            Number of files deleted
        """
        await self._ensure_initialized()
        
        try:
            # List objects
            response = self.s3_client.list_objects_v2(
                Bucket=self.bucket_name,
                Prefix=prefix
            )
            
            # Calculate cutoff time
            cutoff_time = time.time() - (days * 24 * 60 * 60)
            
            # Delete old files
            count = 0
            if 'Contents' in response:
                for obj in response['Contents']:
                    # Convert to timestamp for comparison
                    last_modified_timestamp = obj['LastModified'].timestamp()
                    
                    if last_modified_timestamp < cutoff_time:
                        # Delete the object
                        self.s3_client.delete_object(
                            Bucket=self.bucket_name,
                            Key=obj['Key']
                        )
                        count += 1
                        logger.info(f"Cleaned up old file from S3: {obj['Key']}")
            
            logger.info(f"Cleaned up {count} old files from S3 with prefix {prefix}")
            return count
        except ClientError as e:
            logger.error(f"Error cleaning up old files from S3: {str(e)}")
            return 0
    
    async def copy_file(self, source_key: str, dest_key: str) -> bool:
        """
        Copy a file within the same S3 bucket.
        
        Args:
            source_key: Source S3 object key
            dest_key: Destination S3 object key
            
        Returns:
            True if successful, False otherwise
        """
        await self._ensure_initialized()
        
        try:
            # Copy the object
            self.s3_client.copy_object(
                Bucket=self.bucket_name,
                CopySource={'Bucket': self.bucket_name, 'Key': source_key},
                Key=dest_key
            )
            
            logger.info(f"Copied file in S3 from {source_key} to {dest_key}")
            return True
        except ClientError as e:
            logger.error(f"Error copying file in S3: {str(e)}")
            return False
