import os

from flask import Flask, request
from datetime import datetime
from flask_mysqldb import MySQL

import json

app = Flask(__name__)

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
  
@app.route('/api/submit-new-journal', methods=['POST'])
def submit_new_journal():
    data = request.get_json()
    # Now you can use the data from the request
    date = datetime.now()
    print(data)
    return {
        "status": "success"
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

@app.route('/api/login', methods=['POST'])
def login():
   message = "success"
   data = json.loads(list(request.form.keys())[0])
   username = data.get('username')
   password = data.get("password")

   if request.method == 'POST' and username is not None and password is not None:
        cursor = mysql.connection.cursor()
        cursor.execute('SELECT * FROM users WHERE username = %s AND password = %s', (username, password,))
        account = cursor.fetchone()

        if account is None:
            message = "No account"

   return {
      "status": message
   }
   
@app.route('/api/register', methods=['POST'])
def register():
   message = "success"
   data = json.loads(list(request.form.keys())[0])
   username = data.get('newUsername')
   password = data.get("newPassword")
   email = data.get("newEmail")

   if request.method == 'POST' and username is not None and password is not None and email is not None:
        cursor = mysql.connection.cursor()
        cursor.execute('SELECT * FROM users WHERE email = %s', (email,))
        account = cursor.fetchone()
        if account is not None:
            message = "Account exists"
        else:
            cursor.execute("INSERT INTO users (email, password, username) VALUES (%s, %s, %s)", (email, password, username,))
            mysql.connection.commit()

   return {
      "status": message
   }


if __name__ == '__main__':
  app.run(debug=True, host='0.0.0.0')