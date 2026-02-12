from .session import Base  # noqa: F401

# Import all models so Alembic or Base.metadata.create_all works.
from ..models.user import User  # noqa: F401,E402
