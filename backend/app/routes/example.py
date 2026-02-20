from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.example import ExampleModel
from pydantic import BaseModel
from typing import List

router = APIRouter()

# Pydantic schemas
class ExampleCreate(BaseModel):
    title: str
    description: str = None

class ExampleResponse(BaseModel):
    id: int
    title: str
    description: str = None
    
    class Config:
        from_attributes = True

@router.get("/examples", response_model=List[ExampleResponse])
async def get_examples(db: Session = Depends(get_db)):
    """Get all examples"""
    examples = db.query(ExampleModel).all()
    return examples

@router.post("/examples", response_model=ExampleResponse)
async def create_example(example: ExampleCreate, db: Session = Depends(get_db)):
    """Create a new example"""
    db_example = ExampleModel(**example.dict())
    db.add(db_example)
    db.commit()
    db.refresh(db_example)
    return db_example

@router.get("/examples/{example_id}", response_model=ExampleResponse)
async def get_example(example_id: int, db: Session = Depends(get_db)):
    """Get a specific example"""
    example = db.query(ExampleModel).filter(ExampleModel.id == example_id).first()
    if not example:
        raise HTTPException(status_code=404, detail="Example not found")
    return example
