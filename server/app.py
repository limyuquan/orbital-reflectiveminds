import os

from flask import Flask, request
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

import mysql.connector as connector
import json

app = Flask(__name__)

connection = connector.connect(host=os.environ.get('DATABASE_URL'), 
                               user=os.environ.get('DATABASE_USER'),
                               password=os.environ.get('DATABASE_PASSWORD'),
                               database=os.environ.get('DATABASE_NAME')
                               )

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
   data = json.loads(list(request.form.keys())[0])
   username = data.get('username')
   password = data.get("password")
   userid = None

   if request.method == 'POST' and username is not None and password is not None:
        cursor = connection.cursor(dictionary=True)
        cursor.execute('SELECT userId, username, password FROM users WHERE username = %s', (username,))
        account = cursor.fetchone()
        if account is None:
            message = "No account"
        
        elif check_password_hash(account['password'], password):
            userid = account['userId']
            message = "Success"

        else:
            message = "Fail"
    
   else:
       message="Wrong HTTP method or Missing inputs"

   return {
      "status": message,
      "userId": userid
   }
   
@app.route('/api/register', methods=['POST'])
def register():
   data = json.loads(list(request.form.keys())[0])
   username = data.get('newUsername')
   password = data.get("newPassword")
   hashed_password = generate_password_hash(password)
   email = data.get("newEmail")

   if request.method == 'POST' and username is not None and password is not None and email is not None:
        cursor = connection.cursor(dictionary=True)
        cursor.execute('SELECT * FROM users WHERE username = %s AND email = %s', (username, email,))
        account = cursor.fetchone()
        
        if account is not None: 
            message = "Account already exists"

        else:
            cursor.execute("INSERT INTO users (username, password, email) VALUES (%s, %s, %s)", (username, hashed_password, email,))
            connection.commit()
            message = "Success"
   else:
       message= "Wrong HTTP method used or missing inputs"
   return {
      "status": message
   }


if __name__ == '__main__':
  app.run(debug=True, host='0.0.0.0')