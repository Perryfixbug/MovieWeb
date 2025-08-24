from sqlmodel import SQLModel, Field, Relationship 
from typing import Optional
from datetime import datetime
from schemas.carousel import CarouselBase

class Carousel(CarouselBase, table=True):
  id: Optional[int] = Field(default=None, primary_key=True) 
  createAt: datetime = Field(default_factory=datetime.now)
  movie: Optional["Movie"] = Relationship()

from models.movie import Movie