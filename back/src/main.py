from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from src.database import SessionLocal, engine, Base
from src import models, service, schemas
from fastapi.middleware.cors import CORSMiddleware
from typing import Annotated
from starlette import status
from src.auth.router import router
from src.auth.service import get_current_user

print("✅ App started")

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://feed-back-app-two.vercel.app",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://207.154.221.138:5173",
    "http://feedbackapp-frontend-1:5173",
    "http://207.154.221.138:5173/"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

user_dependency = Annotated[dict, Depends(get_current_user)]
@app.get("/")
def root():
    return {"message": "Welcome!!"}


@app.get("/me", status_code=status.HTTP_200_OK)
async def get_current_user_data(user: user_dependency, db: Session = Depends(get_db)):
    if user is None:
        raise HTTPException(status_code=401, detail="Authentication Failed")
    return {"user": user}

@app.get("/feedbacks", response_model=list[schemas.Feedback])
async def get_all_feedbacks(db: Session = Depends(get_db)):
    return await service.get_feedbacks(db)

@app.post("/feedbacks", response_model=schemas.Feedback, status_code=status.HTTP_201_CREATED)
async def create_feedback(feedback: schemas.FeedbackCreate, db: Session  = Depends(get_db)):
    return await service.create_feedback(db, feedback)

@app.patch("/feedbacks/{feedback_id}", response_model=schemas.Feedback)
async def patch_feedback(feedback_id: int, update: schemas.FeedbackUpdate, db: Session = Depends(get_db)):
    return await service.update_feedback(db, feedback_id, update)

@app.delete("/feedbacks/{feedback_id}")
async def delete_feedback(feedback_id: int, db: Session = Depends(get_db)):
    return await service.delete_feedback(db, feedback_id)

@app.get("/categories", response_model=list[schemas.Category])
def get_all_categories(db:  Session = Depends(get_db)):
    return service.get_categories(db)

@app.post("/categories", response_model=schemas.Category, status_code=status.HTTP_201_CREATED)
def create_category(category: schemas.CategoryCreate, db: Session = Depends(get_db)):
    return service.create_category(db, category)