#!/usr/bin/env python
"""
Migration script to move files from local storage to AWS S3.
Run this script after configuring AWS S3 credentials in the .env file.
"""

import asyncio
import argparse
import logging
from pathlib import Path
from app.utils.storage import migrate_to_s3

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    handlers=[
        logging.StreamHandler(),
        logging.FileHandler("s3_migration.log"),
    ]
)
logger = logging.getLogger(__name__)

async def main():
    """Main migration function."""
    parser = argparse.ArgumentParser(description="Migrate files from local storage to AWS S3")
    parser.add_argument("--directory", "-d", type=str, default="uploads", 
                        help="Directory to migrate (default: uploads)")
    parser.add_argument("--delete", "-D", action="store_true", 
                        help="Delete local files after successful migration")
    parser.add_argument("--recursive", "-r", action="store_true", 
                        help="Recursively migrate all subdirectories")
    
    args = parser.parse_args()
    
    # Validate directory
    directory = Path(args.directory)
    if not directory.exists():
        logger.error(f"Directory not found: {directory}")
        return
    
    logger.info(f"Starting migration of {directory} to S3 (delete_after={args.delete})")
    
    # Migrate files
    if args.recursive:
        # Migrate each subdirectory separately
        subdirs = [d for d in directory.glob("**/*") if d.is_dir()]
        subdirs.insert(0, directory)  # Add the main directory
        
        total_stats = {
            "total_files": 0,
            "migrated_files": 0,
            "failed_files": 0,
            "deleted_files": 0,
            "errors": []
        }
        
        for subdir in subdirs:
            logger.info(f"Migrating subdirectory: {subdir}")
            stats = await migrate_to_s3(subdir, args.delete)
            
            if stats["status"] == "success":
                # Update total stats
                total_stats["total_files"] += stats["total_files"]
                total_stats["migrated_files"] += stats["migrated_files"]
                total_stats["failed_files"] += stats["failed_files"]
                total_stats["deleted_files"] += stats["deleted_files"]
                total_stats["errors"].extend(stats["errors"])
            else:
                logger.error(f"Migration failed for {subdir}: {stats['message']}")
        
        # Print summary
        logger.info("Migration complete!")
        logger.info(f"Total files: {total_stats['total_files']}")
        logger.info(f"Migrated files: {total_stats['migrated_files']}")
        logger.info(f"Failed files: {total_stats['failed_files']}")
        logger.info(f"Deleted files: {total_stats['deleted_files']}")
        
        if total_stats["errors"]:
            logger.warning(f"Errors encountered: {len(total_stats['errors'])}")
            for error in total_stats["errors"][:10]:  # Show first 10 errors
                logger.warning(f"  - {error}")
            
            if len(total_stats["errors"]) > 10:
                logger.warning(f"  ... and {len(total_stats['errors']) - 10} more errors")
    else:
        # Migrate just the specified directory
        stats = await migrate_to_s3(directory, args.delete)
        
        if stats["status"] == "success":
            logger.info("Migration complete!")
            logger.info(f"Total files: {stats['total_files']}")
            logger.info(f"Migrated files: {stats['migrated_files']}")
            logger.info(f"Failed files: {stats['failed_files']}")
            logger.info(f"Deleted files: {stats['deleted_files']}")
            
            if stats["errors"]:
                logger.warning(f"Errors encountered: {len(stats['errors'])}")
                for error in stats["errors"][:10]:  # Show first 10 errors
                    logger.warning(f"  - {error}")
                
                if len(stats["errors"]) > 10:
                    logger.warning(f"  ... and {len(stats['errors']) - 10} more errors")
        else:
            logger.error(f"Migration failed: {stats['message']}")

if __name__ == "__main__":
    asyncio.run(main())
