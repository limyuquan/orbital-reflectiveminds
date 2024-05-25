
from flask import jsonify, Blueprint, Flask, request
from datetime import datetime
from flask_mysqldb import MySQL
import os
from utils import get_db

mysql = get_db(__name__)

dashboard_routes = Blueprint('dashboard_routes', __name__)