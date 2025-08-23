from fastapi import FastAPI
from routes import movie

app = FastAPI()

app.include_router(movie.router, prefix='/api/v1')