import pytest

from app import app  #importing flask app object

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client