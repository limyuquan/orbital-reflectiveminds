
from flask import jsonify, Blueprint, Flask, request
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
import os


def get_db(app):
    
    return "db"