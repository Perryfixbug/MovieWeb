from sqlmodel import SQLModel, Field, Relationship
from schemas.category import CategoryBase
from typing import List
from models.categorymovie import CategoryMovie

class Category(CategoryBase, table=True):
  id: int = Field(primary_key=True)
  movies: List["Movie"] = Relationship(back_populates="categories", link_model=CategoryMovie)

from models.movie import Movie