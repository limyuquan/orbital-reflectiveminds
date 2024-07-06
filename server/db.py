from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy(engine_options={"pool_size": 20, "max_overflow": 20, "echo_pool": True})

def init_database(app):
    # Initialize a new Flask SQLAlchemy object
    db.init_app(app)