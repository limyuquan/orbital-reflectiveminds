from flask import Flask, request, Blueprint
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy import text
import json

from db import db

login_routes = Blueprint('login_routes', __name__)

@login_routes.route('/login', methods=['POST'])
def login():
    data = json.loads(list(request.form.keys())[0])
    username = data.get('username')
    password = data.get("password")
    userid = None

    if request.method == 'POST' and username is not None and password is not None:
        stmt = text('SELECT userId, username, password FROM users WHERE username = :username')
        connection = db.engine.connect()
        result = connection.execute(stmt, {'username': username})
        account = result.fetchone()
        print(account)
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
        stmt = text('SELECT * FROM users WHERE username = :username OR email = :email')
        connection = db.engine.connect()
        result = connection.execute(stmt, {'username': username, 'email': email})
        account = result.fetchone()

        if account is not None: 
            message = "Account already exists"
        else:
            stmt = text('INSERT INTO users (username, password, email) VALUES (:username, :password, :email)')
            connection.execute(stmt, {'username': username, 'password': hashed_password, 'email': email})
            connection.commit()
            message = "Success"
    else:
       message= "Wrong HTTP method used or missing inputs"
    return {
      "status": message
   }