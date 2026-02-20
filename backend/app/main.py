from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .core.config import settings
from .routes import auth
from .db.base import Base  # pulls in models
from .db.session import engine

app = FastAPI(title=settings.project_name)


def create_db_and_tables() -> None:
    """Ensure database schema exists so first signup succeeds without a manual init."""
    Base.metadata.create_all(bind=engine)


# Use Starlette's event handler registration (avoids deprecated FastAPI on_event decorator).
app.add_event_handler("startup", create_db_and_tables)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)


@app.get("/health")
def healthcheck():
    return {"status": "ok"}
