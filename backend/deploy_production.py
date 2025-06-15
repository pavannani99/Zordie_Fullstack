#!/usr/bin/env python
"""
Production deployment script for Zodie backend.
This script helps set up the application for production deployment.
"""

import os
import sys
import shutil
import subprocess
from pathlib import Path

def print_header(message):
    """Print a formatted header message."""
    print("\n" + "=" * 80)
    print(f" {message}")
    print("=" * 80)

def run_command(command):
    """Run a shell command and return the result."""
    print(f"Running: {command}")
    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"Error: {result.stderr}")
        return False
    print(f"Success: {result.stdout}")
    return True

def setup_environment():
    """Set up the production environment."""
    print_header("Setting up production environment")
    
    # Check if .env file exists
    if not os.path.exists(".env"):
        print("Creating .env file from template...")
        shutil.copy(".env.template", ".env")
        print("Please edit the .env file with your production settings.")
        return False
    
    return True

def install_dependencies():
    """Install production dependencies."""
    print_header("Installing production dependencies")
    
    # Create virtual environment if it doesn't exist
    if not os.path.exists("venv"):
        print("Creating virtual environment...")
        if not run_command("python -m venv venv"):
            return False
    
    # Install dependencies
    print("Installing dependencies...")
    if os.name == "nt":  # Windows
        if not run_command("venv\\Scripts\\pip install -r requirements.txt"):
            return False
    else:  # Linux/Mac
        if not run_command("venv/bin/pip install -r requirements.txt"):
            return False
    
    return True

def setup_database():
    """Set up the production database."""
    print_header("Setting up database")
    
    # Run database migrations and initialization
    print("Running database initialization...")
    if os.name == "nt":  # Windows
        if not run_command("venv\\Scripts\\python -m app.db.init_db"):
            return False
    else:  # Linux/Mac
        if not run_command("venv/bin/python -m app.db.init_db"):
            return False
    
    return True

def setup_directories():
    """Set up required directories."""
    print_header("Setting up directories")
    
    # Create required directories
    directories = ["uploads", "output", "logs"]
    for directory in directories:
        os.makedirs(directory, exist_ok=True)
        print(f"Created directory: {directory}")
    
    return True

def generate_supervisor_config():
    """Generate supervisor configuration for production."""
    print_header("Generating supervisor configuration")
    
    config = """[program:zodie_api]
command=/path/to/venv/bin/gunicorn -k uvicorn.workers.UvicornWorker -w 4 -b 0.0.0.0:8000 app.main:app
directory=/path/to/zodie/backend
user=www-data
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
stderr_logfile=/var/log/zodie/api.err.log
stdout_logfile=/var/log/zodie/api.out.log

[program:zodie_worker]
command=/path/to/venv/bin/celery -A app.worker.celery_app worker --loglevel=info
directory=/path/to/zodie/backend
user=www-data
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
stderr_logfile=/var/log/zodie/worker.err.log
stdout_logfile=/var/log/zodie/worker.out.log

[program:zodie_beat]
command=/path/to/venv/bin/celery -A app.worker.celery_app beat --loglevel=info
directory=/path/to/zodie/backend
user=www-data
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
stderr_logfile=/var/log/zodie/beat.err.log
stdout_logfile=/var/log/zodie/beat.out.log

[program:zodie_flower]
command=/path/to/venv/bin/celery -A app.worker.celery_app flower --port=5555
directory=/path/to/zodie/backend
user=www-data
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
stderr_logfile=/var/log/zodie/flower.err.log
stdout_logfile=/var/log/zodie/flower.out.log
"""
    
    with open("supervisor_zodie.conf", "w") as f:
        f.write(config)
    
    print("Supervisor configuration generated: supervisor_zodie.conf")
    print("Please edit the paths in the configuration file before using it.")
    
    return True

def generate_nginx_config():
    """Generate nginx configuration for production."""
    print_header("Generating nginx configuration")
    
    config = """server {
    listen 80;
    server_name yourdomain.com;
    
    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    server_name yourdomain.com;
    
    ssl_certificate /path/to/ssl/certificate.crt;
    ssl_certificate_key /path/to/ssl/private.key;
    
    # SSL settings
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-SHA384;
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:10m;
    ssl_session_tickets off;
    
    # Security headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    
    # API
    location /api {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 90;
        client_max_body_size 10M;
    }
    
    # Flower monitoring (optional, should be protected)
    location /flower {
        proxy_pass http://localhost:5555;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        auth_basic "Restricted";
        auth_basic_user_file /path/to/htpasswd;
    }
    
    # Frontend (assuming it's served from a different location)
    location / {
        root /path/to/frontend/build;
        try_files $uri $uri/ /index.html;
    }
}
"""
    
    with open("nginx_zodie.conf", "w") as f:
        f.write(config)
    
    print("Nginx configuration generated: nginx_zodie.conf")
    print("Please edit the paths and domain in the configuration file before using it.")
    
    return True

def main():
    """Main deployment function."""
    print_header("Zodie Backend Production Deployment")
    
    steps = [
        setup_environment,
        install_dependencies,
        setup_database,
        setup_directories,
        generate_supervisor_config,
        generate_nginx_config
    ]
    
    for step in steps:
        if not step():
            print("\nDeployment stopped due to errors. Please fix the issues and try again.")
            return
    
    print_header("Deployment preparation completed successfully!")
    print("""
Next steps:
1. Edit the .env file with your production settings
2. Edit the supervisor and nginx configuration files with your paths
3. Install and configure Redis for Celery
4. Set up your production database
5. Set up your cloud storage (AWS S3)
6. Start the application using supervisor
7. Configure nginx to serve the application
""")

if __name__ == "__main__":
    main()
