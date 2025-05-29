"""
Rate limiting middleware for FastAPI.
Implements a simple in-memory rate limiter using a sliding window algorithm.
"""

import time
from typing import Dict, Tuple, Callable, Any
from fastapi import Request, HTTPException, status
from functools import wraps

# In-memory store for rate limiting
# Structure: {ip_address: [(timestamp1, endpoint1), (timestamp2, endpoint2), ...]}
request_store: Dict[str, list] = {}

def rate_limiter(max_requests: int = 10, window_seconds: int = 60):
    """
    Rate limiting decorator for FastAPI route handlers.
    
    Args:
        max_requests: Maximum number of requests allowed in the time window
        window_seconds: Time window in seconds
        
    Returns:
        Decorated function
    """
    def decorator(func: Callable) -> Callable:
        @wraps(func)
        async def wrapper(*args, **kwargs):
            # Extract request object
            request = None
            for arg in args:
                if isinstance(arg, Request):
                    request = arg
                    break
            
            if request is None:
                for _, arg in kwargs.items():
                    if isinstance(arg, Request):
                        request = arg
                        break
            
            if request is None:
                raise ValueError("Request object not found in function arguments")
            
            # Get client IP
            client_ip = request.client.host if request.client else "unknown"
            endpoint = request.url.path
            
            # Clean up old requests
            current_time = time.time()
            if client_ip in request_store:
                request_store[client_ip] = [
                    (ts, ep) for ts, ep in request_store[client_ip] 
                    if current_time - ts < window_seconds
                ]
            
            # Initialize if not exists
            if client_ip not in request_store:
                request_store[client_ip] = []
            
            # Count requests for this endpoint
            endpoint_requests = sum(
                1 for ts, ep in request_store[client_ip] 
                if ep == endpoint
            )
            
            # Check if limit exceeded
            if endpoint_requests >= max_requests:
                raise HTTPException(
                    status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                    detail=f"Rate limit exceeded. Try again in {window_seconds} seconds.",
                    headers={"Retry-After": str(window_seconds)}
                )
            
            # Add current request
            request_store[client_ip].append((current_time, endpoint))
            
            # Execute the original function
            return await func(*args, **kwargs)
        
        return wrapper
    
    return decorator
