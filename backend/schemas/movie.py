from sqlmodel import SQLModel, Field
from pydantic import field_validator
from typing import Optional
from datetime import datetime
from enum import Enum
from typing import List
from schemas.video import VideoRead
from schemas.sub import SubRead

class MovieType(str, Enum):
  MOVIE = "movie"
  SERIE = "serie" 

class MovieBase(SQLModel):
  name: str
  description: str
  userRate: Optional[float] = None
  imdbRate: Optional[float] = None
  rottenRate: Optional[float] = None
  length: float 
  publishYear: int
  director: str
  production: str
  country: str
  type: str
  label: Optional[str] = None
  status: str
  fact: Optional[str] = None
  trailer: Optional[str] = None
  poster: Optional[str] = None
  thumbnail: Optional[str] = None
  userId: int = Field(foreign_key="user.id")

class MovieRead(MovieBase):
  id: int
  slug: str
  categories: List[str] 
  videos: Optional[List[VideoRead]] = None
  subs: Optional[List[SubRead]] = None
  createAt: datetime

  @field_validator("categories", mode="before")
  @classmethod
  def to_list_category(cls, v): 
    if v and hasattr(v[0], "value"):
      return [c.value for c in v]
    return v

class MovieCreate(MovieBase):
  categories: List[str]

class MovieUpdate(MovieBase):
  pass

class MovieMetadataSearch(SQLModel):
  id: int
  name: str
  slug: str
  publishYear: int
  categories: List[str]
  type: str
  poster: str

  @field_validator("categories", mode="before")
  @classmethod
  def to_list_category(cls, v): 
    if v and hasattr(v[0], "value"):
      return [c.value for c in v]
    return v