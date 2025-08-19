from schemas.user import UserBase
from sqlmodel import Field, Relationship
from typing import List

from models.userListMovie import UserListMovie
from models.userLikedMovie import UserLikedMovie

class User(UserBase, table=True):
  id: int = Field(primary_key=True)
  uploaded_movies: List["Movie"] = Relationship(back_populates="uploader")
  comments: List["Comment"] = Relationship(back_populates="user")
  reviews: List["Review"] = Relationship(back_populates="user")
  payments: List["Payment"] = Relationship(back_populates="user")
  listMovies: List["Movie"] = Relationship(back_populates="userList", link_model=UserListMovie)
  likedMovies: List["Movie"] = Relationship(back_populates="userLiked", link_model=UserLikedMovie)

from models.movie import Movie
from models.comment import Comment
from models.review import Review
from models.payment import Payment
