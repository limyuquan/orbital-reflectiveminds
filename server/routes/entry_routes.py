
from flask import jsonify, Blueprint, Flask, request
from datetime import datetime
from sqlalchemy import text
from db import db

entry_routes = Blueprint('entry_routes', __name__)

@entry_routes.route("/test")
def test():
    return 'This is the career kaki user routes'

@entry_routes.route('/submit-new-journal', methods=['POST'])
def submit_new_journal():
    data = request.get_json()
    user_id = data['user_id']
    title = data['title']
    content = data['content']
    emotion = data['emotion']
    date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    try:
        connection = db.engine.connect()
        stmt = text("INSERT INTO userEntry (userId, startDate, title, body, emotions) VALUES (:user_id, :date, :title, :content, :emotion)")
        connection.execute(stmt, {"user_id":user_id, "date":date, "title":title, "content":content, "emotion":emotion})
        stmt = text("UPDATE users SET last_entry = :date WHERE userId = :user_id")
        connection.execute(stmt, {"date":date, "user_id":user_id})
        connection.commit()
        
        # stmt = text('INSERT INTO users (username, password, email, created_at, last_entry) VALUES (:username, :password, :email, NOW(), NOW())')
        #     connection.execute(stmt, {'username': username, 'password': hashed_password, 'email': email})
        #     connection.commit()
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }
        
    return {
        "status": "success"
    }