
from flask import jsonify, Blueprint, Flask, request
from sqlalchemy import text
from db import db

dashboard_routes = Blueprint('dashboard_routes', __name__)

@dashboard_routes.route('/get-entries', methods=['POST'])
def get_previous_journals():
    data = request.get_json()
    user_id = data['user_id']
    cur_page = data['curPage']

    # Use SQLAlchemy's text() for raw SQL
    connection = db.engine.connect()
    stmt = text("SELECT title, startDate as date, body as content, emotions as emotion FROM userEntry WHERE userId = :user_id ORDER BY entryId DESC")
    entries = connection.execute(stmt, {"user_id":user_id}).fetchall()

    # Convert the entries to a list of dictionaries
    all_journals = [{"title": title, "date": date.strftime("%Y-%m-%d"), "content": content, "emotion": emotion} for title, date, content, emotion in entries]
    maxPages = len(all_journals) // 5 + 1
    start_index = cur_page * 5 - 5
    end_index = min(cur_page * 5, len(all_journals))
    journals = all_journals[start_index:end_index]

    return {
        "maxPages": maxPages,
        "currentPage": cur_page,
        "journals": journals
    }