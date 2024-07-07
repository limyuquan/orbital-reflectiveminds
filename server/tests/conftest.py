# conftest.py
import pytest
from app import app
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base

# Define the database URL for SQLite in-memory
TEST_DATABASE_URL = "sqlite:///:memory:"

# Create the engine and sessionmaker for SQLAlchemy
engine = create_engine(TEST_DATABASE_URL)
Session = sessionmaker(bind=engine)

# Fixture to set up and tear down the database session
@pytest.fixture(scope="session")
def session():
    # Set up: create tables in the in-memory database
    Base.metadata.create_all(engine)
    
    # Provide the session to the tests
    session = Session()
    yield session # Makes session available to the tests
    
    # Teardown: rollback any changes and close the session
    session.rollback() 
    session.close()


# Fixture for the Flask test client
@pytest.fixture(scope="session")
def client(session):
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = TEST_DATABASE_URL
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    with app.test_client() as client:
        yield client