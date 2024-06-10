from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def init_database(app):
    # Initialize a new Flask SQLAlchemy object
    db.init_app(app)