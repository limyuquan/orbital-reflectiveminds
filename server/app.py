import os

from flask import Flask, request
from flask_mysqldb import MySQL
from datetime import datetime
from routes.entry_routes import entry_routes
from routes.dashboard_routes import dashboard_routes
from routes.login_routes import login_routes

import os

app = Flask(__name__)

app.config['MYSQL_HOST'] = os.environ.get('DATABASE_URL')
app.config['MYSQL_USER'] = os.environ.get('DATABASE_USER')
app.config['MYSQL_PASSWORD'] = os.environ.get('DATABASE_PASSWORD')
app.config['MYSQL_DB'] = os.environ.get('DATABASE_NAME')

mysql = MySQL(app)

app.register_blueprint(entry_routes, url_prefix='/api/entry')
app.register_blueprint(dashboard_routes, url_prefix='/api/dashboard')
app.register_blueprint(login_routes, url_prefix='/api/auth')

@app.route('/api', methods=['GET'])
def index():
  return {
    "test": "test"
  }

if __name__ == '__main__':
  app.run(debug=True, host='0.0.0.0')