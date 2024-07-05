# conftest.py
import pytest
import os

from app import app

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

from routes import entry_routes, dashboard_routes, login_routes  # Replace with your actual app structure and routes


#steps to do: 1. Create a new flask app test, 2. create temp database 
@pytest.fixture
def client():
    user = os.environ.get('DATABASE_USER')
    password = os.environ.get('DATABASE_PASSWORD')
    host = os.environ.get('DATABASE_URL')
    dbname = os.environ.get('DATABASE_NAME')

    app.config['TESTING'] = True
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    with app.test_client() as client:

        #with app.app_context():
            #db.create_all()  # Ensure the database is set up

        yield client

