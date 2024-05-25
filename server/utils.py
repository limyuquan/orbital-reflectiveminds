
from flask import jsonify, Blueprint, Flask, request
from datetime import datetime
from flask_mysqldb import MySQL
import os

def get_db(name):
    app = Flask(name)
    app.config['MYSQL_HOST'] = os.environ.get('DATABASE_URL')
    app.config['MYSQL_USER'] = os.environ.get('DATABASE_USER')
    app.config['MYSQL_PASSWORD'] = os.environ.get('DATABASE_PASSWORD')
    app.config['MYSQL_DB'] = os.environ.get('DATABASE_NAME')
    
    return MySQL(app)