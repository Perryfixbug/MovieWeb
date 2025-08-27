from sqlmodel import SQLModel, Field
from schemas.movie import MovieRead
from typing import List

class CategoryBase(SQLModel):
  value: str
  isDisplay: bool = Field(default=False)
  order: int

class CategoryRead(CategoryBase):
  id: int

class CategoryHasMovie(CategoryBase):
  id: int
  movies: List[MovieRead]

class CategoryCreate(CategoryBase):
  pass