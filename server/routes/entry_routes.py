
from flask import jsonify, Blueprint, Flask, request
from datetime import datetime
from flask_mysqldb import MySQL
import os
from utils import get_db

mysql = get_db(__name__)

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
        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO userEntry(userId, startDate, title, body, emotions) VALUES (%s, %s, %s, %s, %s)", (user_id, date, title, content, emotion))
        cur.execute("UPDATE users SET last_entry = %s WHERE userId = %s", (date, user_id))
        mysql.connection.commit()
        cur.close()
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }
        
    return {
        "status": "success"
    }