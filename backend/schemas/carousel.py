from sqlmodel import SQLModel, Field, Relationship
from typing import Optional
from datetime import date
from schemas.movie import MovieRead

class CarouselBase(SQLModel):
  movie_id: int = Field(foreign_key="movie.id")
  is_active: bool = True

class CarouselRead(CarouselBase):
  id: int
  movie: Optional[MovieRead]

class CarouselCreate(CarouselBase):
  pass

class CarouselUpdate(CarouselBase):
  pass
