from sqlmodel import SQLModel, Field 
from typing import Optional

class Carousel(SQLModel, table=True):
  id: Optional[int] = Field(default=None, primary_key=True)
  movie_id: int = Field(foreign_key="movie.id")
  order: int