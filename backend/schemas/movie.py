from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime

class MovieBase(SQLModel):
  name: str
  description: str
  userRate: Optional[float] = None
  imdbRate: Optional[float] = None
  rottenRate: Optional[float] = None
  length: float 
  publishYear: int
  type: str
  category: Optional[str] = None
  status: str
  link_video: str
  link_sub: Optional[str] = None
  poster: Optional[str] = None
  thumbnail: Optional[str] = None
  user_id: int = Field(foreign_key="user.id")

class MovieRead(MovieBase):
  id: int
  slug: str
  createAt: datetime

class MovieCreate(MovieBase):
  pass

class MovieUpdate(MovieBase):
  pass