import httpx
import json
from typing import Optional, Dict, Any
from app.core.config import settings

async def verify_clerk_token(token: str) -> Optional[Dict[str, Any]]:
    """
    Verify a Clerk session token and return user information
    
    This implementation verifies a Clerk session token by making a request to the Clerk API.
    """
    try:
        headers = {
            "Authorization": f"Bearer {settings.CLERK_SECRET_KEY}",
            "Content-Type": "application/json"
        }
        
        # Use the Clerk API to verify the session token
        async with httpx.AsyncClient() as client:
            # First, verify the token
            response = await client.get(
                "https://api.clerk.com/v1/sessions/verify",
                headers=headers,
                params={"session_token": token}
            )
            
            if response.status_code != 200:
                return None
                
            session_data = response.json()
            user_id = session_data.get("data", {}).get("user_id")
            
            if not user_id:
                return None
                
            # Now get the user details
            user_response = await client.get(
                f"https://api.clerk.com/v1/users/{user_id}",
                headers=headers
            )
            
            if user_response.status_code != 200:
                return None
                
            return user_response.json().get("data", {})
    except Exception as e:
        print(f"Error verifying Clerk token: {str(e)}")
        return None

async def get_user_from_clerk_token(token: str) -> Optional[Dict[str, Any]]:
    """
    Get user information from a Clerk token
    
    This function verifies the token and extracts user information.
    """
    user_data = await verify_clerk_token(token)
    
    if not user_data:
        return None
        
    # Extract relevant user information
    email_addresses = user_data.get("email_addresses", [])
    primary_email = next((email.get("email_address") for email in email_addresses if email.get("primary")), None)
    
    first_name = user_data.get("first_name", "")
    last_name = user_data.get("last_name", "")
    
    return {
        "id": user_data.get("id"),
        "email": primary_email,
        "first_name": first_name,
        "last_name": last_name,
        "full_name": f"{first_name} {last_name}".strip()
    }
