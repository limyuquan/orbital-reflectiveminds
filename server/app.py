import os

from flask import Flask, request
from datetime import datetime
from routes.entry_routes import entry_routes
from routes.dashboard_routes import dashboard_routes
from routes.login_routes import login_routes
from db import init_database
from flask_cors import CORS

import os

app = Flask(__name__)
CORS(app)

user = os.environ.get('DATABASE_USER')
password = os.environ.get('DATABASE_PASSWORD')
host = os.environ.get('DATABASE_URL')
dbname = os.environ.get('DATABASE_NAME')

app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql+pymysql://{user}:{password}@{host}/{dbname}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

init_database(app)

app.register_blueprint(entry_routes, url_prefix='/api/entry')
app.register_blueprint(dashboard_routes, url_prefix='/api/dashboard')
app.register_blueprint(login_routes, url_prefix='/api/auth')

@app.route('/')
def hello_world():
  return 'Hello, World!'

@app.route('/api', methods=['GET'])
def index():
  return {
    "test": "test"
  }

if __name__ == '__main__':
  app.run(debug=True, host='0.0.0.0')