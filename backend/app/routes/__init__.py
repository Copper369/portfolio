from fastapi import APIRouter
from .example import router as example_router

# Create main API router
api_router = APIRouter()

# Include route modules
api_router.include_router(example_router, tags=["examples"])

# Add more routers here as needed
# from .users import router as users_router
# api_router.include_router(users_router, prefix="/users", tags=["users"])
