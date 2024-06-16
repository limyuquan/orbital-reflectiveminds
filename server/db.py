from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy(engine_options={"pool_size": 10, "max_overflow": 20})

def init_database(app):
    # Initialize a new Flask SQLAlchemy object
    db.init_app(app)