from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, func
from sqlalchemy.orm import relationship
from .database import Base

class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)

    feedbacks = relationship("Feedback", back_populates="category")

class Feedback(Base):
    __tablename__ = "feedbacks"

    id = Column(Integer, primary_key=True, index=True)
    text = Column(String, nullable=False)
    likes = Column(Integer, default=0)
    created_at = Column(DateTime, server_default=func.now())

    category_id = Column(Integer, ForeignKey("categories.id"))
    category = relationship("Category", back_populates="feedbacks")
