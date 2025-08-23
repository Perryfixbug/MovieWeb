from fastapi import APIRouter, Depends, HTTPException
from dependencies import get_session
from sqlmodel import Session, select
from models.movie import Movie
from schemas.movie import MovieRead, MovieCreate, MovieUpdate
from typing import List, Dict
from slugify import slugify

router = APIRouter(
  prefix='/movie',
  tags=["Movie"]
)

@router.get('/')
async def get_all_movies(
  session: Session = Depends(get_session)
)->Dict[str, List[MovieRead]]:
  category = ["sci-fi", "drama", "action", "adventure"]
  response = {}
  for item in category:
    statement = select(Movie).where(Movie.category == item).limit(5)
    movies = session.exec(statement).all()
    response[item] = movies 

  return response

@router.get('/{slug}')
async def get_movie(
  slug: str,
  session: Session = Depends(get_session)
)->MovieRead:
  movie = session.exec(select(Movie).where(Movie.slug == slug)).first()
  return movie

@router.post('/')
async def create_movie(
  movie_data: MovieCreate,
  session: Session = Depends(get_session)
)->MovieRead:
  slug = slugify(movie_data.name)
  movie = Movie(**movie_data.model_dump(), slug=slug)
  session.add(movie)
  session.commit()
  session.refresh(movie)
  return movie

@router.put('/{movie_id}')
async def update_movie(
  movie_data: MovieUpdate,
  movie_id: int,
  session: Session = Depends(get_session)
)->MovieCreate:
  movie = session.get(Movie, movie_id)
  if not movie:
    raise HTTPException(status_code=400, detail="Movie not found!")
  
  for key, value in movie_data.model_dump():
    setattr(movie, key, value)
  session.commit()
  session.refresh(movie)
  return movie

@router.delete('/{movie_id}')
async def delete_movie(
  movie_id: int,
  session: Session = Depends(get_session)
):
  movie = session.get(Movie, movie_id)
  if not movie:
    raise HTTPException(status_code=400, detail="Movie not found!")
  session.delete(movie)
  session.commit()
  return "Delete movie successfully!"