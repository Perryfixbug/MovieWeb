from fastapi import APIRouter, Depends, HTTPException, Response, Request
from sqlmodel import Session, select, or_
from dependencies import get_session
from models.user import User
from schemas.user import UserRead, UserLogin, UserCreate, UserUpdate
import bcrypt
from typing import Dict
from lib.jwt import jwt_encoder, jwt_decoder

router = APIRouter(
  prefix='/auth',
  tags=['Auth']
)

@router.post('/login')
async def login(
  response: Response,
  user_login_data: UserLogin,
  session: Session = Depends(get_session)
)->Dict:
  # Tìm user theo username
  user = session.exec(
      select(User).where(User.username == user_login_data.username)
  ).first()

  if not user:
      raise HTTPException(status_code=401, detail="Sai tên đăng nhập hoặc mật khẩu")

  # Kiểm tra password
  if not bcrypt.checkpw(user_login_data.password.encode("utf-8"), user.password.encode("utf-8")):
      raise HTTPException(status_code=401, detail="Sai tên đăng nhập hoặc mật khẩu")

  data = {
     "userId": user.id,
     "role" : user.role
  }
  response.set_cookie(
    key="refreshToken",
    value=jwt_encoder(data=data, delta_time=24),
    httponly=True,
    secure=False,
    samesite="lax",
    max_age=60*60*24*7 #1 ngày 
  )
  return {
    "accessToken" : jwt_encoder(data=data, delta_time=15/60),
  }

@router.post('/signup')
async def signup(
   response: Response,
  user_data: UserCreate,
  session: Session = Depends(get_session)
)->UserRead:
  user = session.exec(select(User).where(or_(User.username == user_data.username, User.email == user_data.email))).first()
  if user:
    raise HTTPException(status_code=400, detail="Tên đăng nhập hoặc email đã được sử dụng")
  
  hashed_password = bcrypt.hashpw(user_data.password.encode("utf-8"), bcrypt.gensalt())
  data = user_data.model_dump()
  data["password"] = hashed_password.decode("utf-8")  # lưu dạng str

  user = User(**data)
  session.add(user)
  session.commit()

  token_data = {
     "userId": user.id,
     "role": user.role
  }
  response.set_cookie(
    key="refreshToken",
    value=jwt_encoder(data=token_data, delta_time=24*7),
    httponly=True,
    secure=False,
    samesite="lax",
    max_age=60*60*24*7 #1 tuần
  )

  return {
    "acessToken": jwt_encoder(data=token_data, delta_time=15/60)
  }

@router.get('/refresh')
async def refresh_token(
  request: Request,
  session: Session = Depends(get_session)
)->Dict:
  refresh_token = request.cookies.get("refreshToken")
  if not refresh_token:
    raise HTTPException(status_code=401, detail="Chưa đăng nhập, xin mời đăng nhập")
  payload = jwt_decoder(refresh_token)
  userId = int(payload["userId"])
  user = session.get(User, userId)
  if not user:
    raise HTTPException(status_code=401, detail="Không tìm thấy người dùng")
  data = {
    "userId": user.id,
    "role": user.role
  }
  return {
    "accessToken": jwt_encoder(data=data, delta_time=15/60)
  }

@router.delete('/logout')
async def logout(
  response: Response
):
  response.delete_cookie("refreshToken")