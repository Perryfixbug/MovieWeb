from sqlmodel import SQLModel, Field, Relationship
from datetime import datetime
from typing import Optional

class ReviewBase(SQLModel):
  rate: float
  content: Optional[str] = None
  movieId: int = Field(foreign_key="movie.id")
  userId: int = Field(foreign_key="user.id")
