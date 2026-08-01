from fastapi import FastAPI

from app.api.routes.health import router as health_router

app = FastAPI(
    title="Memora API",
    version="1.0.0"
)

@app.get("/")
def root():
    return {"message": "Welcome to Memora API"}

@app.get("/health")
def health():
    return {"status": "Healthy"}

app.include_router(health_router)