from flask import Flask, request, jsonify
from datetime import datetime
from routes.entry_routes import entry_routes
from flask_mysqldb import MySQL
import os

app = Flask(__name__)

app.register_blueprint(entry_routes, url_prefix='/api/entry')

app.config['MYSQL_HOST'] = os.environ.get('DATABASE_URL')
app.config['MYSQL_USER'] = os.environ.get('DATABASE_USER')
app.config['MYSQL_PASSWORD'] = os.environ.get('DATABASE_PASSWORD')
app.config['MYSQL_DB'] = os.environ.get('DATABASE_NAME')

mysql = MySQL(app)

@app.route('/api', methods=['GET'])
def index():
  return {
    "test": "test"
  }
    
@app.route('/api/get-entries', methods=['GET'])
def get_previous_journals():
    return {
        "maxPages": 1,
        "currentPage": 1,
        "journals": [
            {
                "title": "My first journal entry",
                "date": "2021-01-01",
                "content": "Today was a great day!",
                "emotion": "happy"
            },
            {
                "title": "My second journal entry",
                "date": "2021-01-02",
                "content": "Today was a bad day!",
                "emotion": "sad"
            },
            {
                "title": "My third journal entry",
                "date": "2021-01-03",
                "content": "Today was a normal day!",
                "emotion": "neutral"
            }
        ]
    }

if __name__ == '__main__':
  app.run(debug=True, host='0.0.0.0')