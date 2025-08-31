from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import movie, carousel, category, auth, user, comment

app = FastAPI()

origins = [
  "http://localhost:3000"
]

app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  allow_credentials=True,
  allow_methods = ["*"],
  allow_headers=["*"]
)

app.include_router(movie.router, prefix='/api/v1')
app.include_router(carousel.router, prefix='/api/v1')
app.include_router(category.router, prefix='/api/v1')
app.include_router(auth.router, prefix='/api/v1')
app.include_router(user.router, prefix='/api/v1')
app.include_router(comment.router, prefix='/api/v1')
