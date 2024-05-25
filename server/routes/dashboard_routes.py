
from flask import jsonify, Blueprint, Flask, request
from datetime import datetime
from flask_mysqldb import MySQL
import os
from utils import get_db

    
mysql = get_db(__name__)

dashboard_routes = Blueprint('dashboard_routes', __name__)

@dashboard_routes.route('/get-entries', methods=['POST'])
def get_previous_journals():
    data = request.get_json()
    user_id = data['user_id']
    cur_page = data['curPage']
    
    cur = mysql.connection.cursor()
    cur.execute("SELECT title, startDate as date, body as content, emotions as emotion FROM userEntry WHERE userId = %s ORDER BY date DESC", (user_id,))
    entries = cur.fetchall()
    cur.close()

    # Convert the entries to a list of dictionaries
    all_journals = [{"title": title, "date": date.strftime("%Y-%m-%d %H:%M:%S"), "content": content, "emotion": emotion} for title, date, content, emotion in entries]
    maxPages = len(all_journals) // 5 + 1
    start_index = cur_page * 5 - 5
    end_index = min(cur_page * 5, len(all_journals))
    journals = all_journals[start_index:end_index]
    
    return {
        "maxPages": maxPages,
        "currentPage": cur_page,
        "journals": journals
    }