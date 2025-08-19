from sqlmodel import SQLModel, Field, Relationship
from datetime import datetime

class ReviewBase(SQLModel):
  rate: float
  createAt: datetime
  movieId: int = Field(foreign_key="movie.id")
  userId: int = Field(foreign_key="user.id")
