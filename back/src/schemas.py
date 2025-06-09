from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class CategoryBase(BaseModel):
    name: str

class CategoryCreate(CategoryBase):
    pass

class Category(CategoryBase):
    id: int
    class Config:
        orm_mode = True

class FeedbackBase(BaseModel):
    text: str
    likes: Optional[int] = 0

class FeedbackCreate(FeedbackBase):
    category_id: int

class FeedbackUpdate(BaseModel):
    text: Optional[str] = None
    likes: Optional[int] = None


class Feedback(FeedbackBase):
    id: int
    created_at: datetime
    category: Category
    class Config:
        orm_mode = True
