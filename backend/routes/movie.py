from fastapi import APIRouter, Depends, HTTPException, Query
from dependencies import get_session
from sqlmodel import Session, select, func
from sqlalchemy.orm import selectinload
from models.movie import Movie
from schemas.movie import MovieRead, MovieCreate, MovieUpdate
from models.category import Category
from models.categorymovie import CategoryMovie
from typing import List, Dict
from slugify import slugify

router = APIRouter(
  prefix='/movie',
  tags=["Movie"]
)

@router.get('/all')
async def get_all_movies(
  type: str = None,  
  country: str = None, 
  category: str = None,
  session: Session = Depends(get_session)
)->List[MovieRead]:
  query = select(Movie)
  if type:
    query = query.where(Movie.type == type)
  if country:
    query = query.where(Movie.country == country)
  if category:
    query = query.join(Movie.categories).where(Category.value == category)

  movies = session.exec(query).all()

  return movies

@router.get('/country')
async def get_all_countries(
  session: Session = Depends(get_session)
)->List[str]:
  countries = session.exec(select(Movie.country).distinct()).all()
  return countries

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
  
  #Tao movie
  slug = slugify(movie_data.name)
  movie_dict = movie_data.model_dump(exclude={"categories"})
  movie = Movie(**movie_dict, slug=slug)
  session.add(movie)
  session.commit()
  session.refresh(movie)

  #Lấy các category đang có
  exist_categories = {c.value: c for c in session.exec(select(Category)).all()}
  
  # Lấy order lớn nhất
  max_order = session.exec(select(func.max(Category.order))).one_or_none()
  max_order = max_order if max_order is not None else 0
  
  for c in movie_data.categories:
    if c in exist_categories:
      category = exist_categories[c]
    else:
      max_order += 1
      category = Category(value=c, order=max_order)
      session.add(category)
      session.commit()
      session.refresh(category)
      exist_categories[c] = category
    
    #Quan he Category - Movie
    cm = CategoryMovie(movieId=movie.id, categoryId=category.id)
    session.add(cm)
      
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