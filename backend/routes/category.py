from fastapi import APIRouter, Depends
from sqlmodel import Session, select, asc
from models.category import Category
from schemas.category import CategoryRead, CategoryCreate, CategoryHasMovie
from schemas.movie import MovieRead
from dependencies import get_session
from typing import List
from sqlalchemy.orm import selectinload

router = APIRouter(
  prefix='/category',
  tags=['Category']
)

@router.get('/')
def get_categories(
  session: Session = Depends(get_session)
)->List[CategoryRead]:
  categories = session.exec(select(Category)).all()
  return categories

@router.get('/movie')
def get_all_movie_by_display_category(
  session: Session = Depends(get_session)
)->List[CategoryHasMovie]:
  display_categories = session.exec(
    select(Category)
    .where(Category.isDisplay == True)
    .order_by(asc(Category.order))
    .options(selectinload(Category.movies))
  ).all()    
  return display_categories

@router.get('/{slug}')
def get_movie_by_category(
  slug: str,
  session: Session = Depends(get_session)
)->List[MovieRead]:
  category = session.exec(select(Category).where(Category.value == slug)).first()
  movies = category.movies
  return movies

@router.post('/')
def create_category(
  category_data: CategoryCreate,
  session: Session = Depends(get_session)
)->CategoryRead:
  category = Category(**category_data.model_dump())
  session.add(category)
  session.commit()
  session.refresh(category)
  return category

