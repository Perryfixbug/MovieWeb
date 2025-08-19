from sqlmodel import SQLModel, Field
from datetime import datetime

class CommentBase(SQLModel):
  content: str
  createAt: datetime
  movieId: int = Field(foreign_key="movie.id")
  userId: int = Field(foreign_key="user.id")
