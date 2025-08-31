from fastapi import APIRouter, Depends, HTTPException
from dependencies import get_session, get_user_id
from schemas.user import UserRead, UserCreate
from models.user import User
from sqlmodel import Session

router = APIRouter(
  prefix='/user',
  tags=['User']
)

@router.get('/me')
async def get_user_info(
  userId: int = Depends(get_user_id),
  session: Session = Depends(get_session)
)->UserRead:
  user = session.get(User, userId)
  if not user:
    raise HTTPException(status_code=400, detail="Không tìm thấy người dùng")
  return user