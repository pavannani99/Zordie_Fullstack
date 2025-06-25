from fastapi import APIRouter, Depends, HTTPException, status
from typing import Any, List, Dict
from sqlalchemy.ext.asyncio import AsyncSession

from app.api import deps
from app.models.user import User
from app.crud.crud_agent import agent_output
from app.schemas.agent import AgentOutput, AgentOutputCreate

router = APIRouter()


@router.post("/agent-response", response_model=AgentOutput)
async def create_agent_response(
    *,
    db: AsyncSession = Depends(deps.get_db),
    agent_response: AgentOutputCreate,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Create a new agent response.
    """
    return await agent_output.create_with_user(db=db, obj_in=agent_response, user_id=current_user.id)


@router.get("/agent-responses/{user_id}", response_model=List[AgentOutput])
async def read_agent_responses(
    user_id: int,
    db: AsyncSession = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Retrieve agent responses for a user.
    """
    # Check if the current user is a superuser or the requested user
    if current_user.id != user_id and not current_user.is_superuser:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions to access this resource",
        )
    
    return await agent_output.get_multi_by_user(db=db, user_id=user_id, skip=skip, limit=limit)


@router.post("/trigger-agent", response_model=Dict[str, Any])
async def trigger_agent(
    *,
    db: AsyncSession = Depends(deps.get_db),
    agent_id: str,
    user_id: int,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Trigger an AI agent to generate a response.
    """
    # Check if the current user is a superuser or the requested user
    if current_user.id != user_id and not current_user.is_superuser:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions to access this resource",
        )
    
    # If this is the resume intelligence agent, use the resume analyzer
    if agent_id == "RESUME_INTELLIGENCE":
        # This would typically include parameters for the resume and job description
        # For now, we'll return a placeholder response
        from app.utils.resume_analyzer import ResumeAnalyzer
        
        # In a real implementation, you would get the resume and job description paths
        # from the request or database
        response = {
            "agent_id": agent_id,
            "message": "Resume analysis completed successfully",
            "confidence_score": 0.95,
            "metadata": {"overall_score": 0.85, "skill_match": 0.82}
        }
    else:
        # For other agents, return mock data for now
        response = {
            "agent_id": agent_id,
            "message": f"This is a response from {agent_id} for user {user_id}",
            "confidence_score": 0.95,
            "metadata": {"source": "agent_system"}
        }
    
    # Save the response to the database
    agent_response = AgentOutputCreate(
        user_id=user_id,
        agent_id=agent_id,
        message=response["message"],
        confidence_score=response["confidence_score"],
        metadata=response["metadata"]
    )
    await agent_output.create_with_user(db=db, obj_in=agent_response, user_id=user_id)
    
    return response