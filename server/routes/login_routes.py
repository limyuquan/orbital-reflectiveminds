from flask import Flask, request, Blueprint
from flask_mysqldb import MySQL
from werkzeug.security import generate_password_hash, check_password_hash
from utils import get_db

import json

mysql = get_db(__name__)

login_routes = Blueprint('login_routes', __name__)

@login_routes.route('/login', methods=['POST'])
def login():
   data = json.loads(list(request.form.keys())[0])
   username = data.get('username')
   password = data.get("password")
   userid = None

   if request.method == 'POST' and username is not None and password is not None:
        cur = mysql.connection.cursor()
        cur.execute('SELECT userId, username, password FROM users WHERE username = %s', (username,))
        account = cur.fetchone()
        if account is None:
            message = "No account"
        
        elif check_password_hash(account[2], password):
            userid = account[0]
            message = "Success"

        else:
            message = "Fail"
    
   else:
       message="Wrong HTTP method or Missing inputs"

   return {
      "status": message,
      "userId": userid
   }


@login_routes.route('/register', methods=['POST'])
def register():
    print("register route")
    data = json.loads(list(request.form.keys())[0])
    username = data.get('newUsername')
    password = data.get("newPassword")
    hashed_password = generate_password_hash(password)
    email = data.get("newEmail")

    if request.method == 'POST' and username is not None and password is not None and email is not None:
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM users WHERE username = %s OR email = %s', (username, email,))
        account = cur.fetchone()
        
        if account is not None: 
            message = "Account already exists"

        else:
            cur.execute("INSERT INTO users (username, password, email) VALUES (%s, %s, %s)", (username, hashed_password, email,))
            mysql.connection.commit()
            cur.close()
            message = "Success"
    else:
       message= "Wrong HTTP method used or missing inputs"
    return {
      "status": message
   }