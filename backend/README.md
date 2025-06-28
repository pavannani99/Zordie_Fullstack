# Zodie Backend

This is the FastAPI backend for the Zodie application, using NeonDB PostgreSQL for database storage. The backend provides authentication with JWT tokens and integration with Clerk authentication, as well as zodiac sign data and horoscope functionality.

## Setup Instructions
python -m venv venv
venv\Scripts\activate


1. **Set up environment variables**

   Update the `.env` file with your credentials:

   ```
   # Database Configuration
   DATABASE_URL=postgresql://neondb_owner:password@your-neon-db-host.neon.tech/neondb?sslmode=require

   # Security
   ACCESS_TOKEN_SECRET_KEY=your-access-token-secret-key
   REFRESH_TOKEN_SECRET_KEY=your-refresh-token-secret-key
   ACCESS_TOKEN_EXPIRE_MINUTES=30
   REFRESH_TOKEN_EXPIRE_DAYS=7

   # Clerk Authentication
   CLERK_SECRET_KEY=your-clerk-secret-key

   # CORS
   BACKEND_CORS_ORIGINS=["http://localhost:5173"]
   ```

2. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```

3. **Initialize the database and run the application**

   ```bash
   python init_and_run.py
   ```

   This will create the database tables, initialize sample data, and start the server. The API will be available at http://localhost:8000

## API Documentation

Once the server is running, you can access:

- API documentation: http://localhost:8000/docs
- Alternative documentation: http://localhost:8000/redoc
- Health check: http://localhost:8000/health

## Key Endpoints

### Authentication

- `/api/v1/login/access-token` - Get JWT access and refresh tokens (OAuth2 compatible)
- `/api/v1/login/refresh-token` - Refresh an access token using a refresh token
- `/api/v1/login/clerk-auth` - Authenticate with Clerk and get JWT tokens
- `/api/v1/login/test-token` - Test if a token is valid

### Users

- `/api/v1/users/` - Create a new user
- `/api/v1/users/me` - Get current user info
- `/api/v1/users/{user_id}` - Get user by ID (admin only)

### Profile

- `/api/v1/profile/me` - Get or update current user profile



## Authentication Flow

1. **Standard Authentication**:
   - User logs in with email/password via `/api/v1/login/access-token`
   - Backend returns access_token and refresh_token
   - Use access_token in Authorization header for protected endpoints
   - When access_token expires, use refresh_token to get a new one via `/api/v1/login/refresh-token`

2. **Clerk Authentication**:
   - Frontend authenticates with Clerk
   - Send Clerk token to `/api/v1/login/clerk-auth`
   - Backend verifies token and returns JWT tokens
   - Use JWT tokens as in standard authentication
