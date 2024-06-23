
from flask import jsonify, Blueprint, Flask, request
from sqlalchemy import text
from db import db

dashboard_routes = Blueprint('dashboard_routes', __name__)

@dashboard_routes.route('/get-entries', methods=['POST'])
def get_previous_journals():
    data = request.get_json()
    user_id = data['user_id']
    cur_page = data['curPage']
    filtered_tags = data['filtered_tags']

    # Use SQLAlchemy's text() for raw SQL
    with db.engine.connect() as connection:
        stmt = text("SELECT title, startDate as date, body as content, emotions as emotion, journal_tags as tags FROM userEntry WHERE userId = :user_id ORDER BY entryId DESC")
        entries = connection.execute(stmt, {"user_id":user_id}).fetchall()

    # Convert the entries to a list of dictionaries

    all_journals = [{"title": title, "date": date.strftime("%Y-%m-%d"), "content": content, "emotion": emotion, "tags":tags} for title, date, content, emotion, tags in entries]


    filteredEntries = []
    for entry in all_journals:
        if (len(filtered_tags) == 0):  #no filters
            break;
        tag_array = entry["tags"].split(',');
        for tag in tag_array:
            present = filtered_tags.get(tag)
            if present:
                filteredEntries.append(entry)
                break
            else:
                continue


    maxPages = len(all_journals) // 5 + 1
    start_index = cur_page * 5 - 5
    end_index = min(cur_page * 5, len(all_journals))
    journals = all_journals[start_index:end_index] 
    tags = [entry["tags"] for entry in all_journals]

    return {
        "maxPages": maxPages,
        "currentPage": cur_page,
        "journals": journals if len(filteredEntries) == 0 else filteredEntries[start_index:end_index],
        "tags": tags
    }
    
@dashboard_routes.route('/get-emotion-stats', methods=['POST'])
def get_emotion_stats():
    data = request.get_json()
    user_id = data['user_id']

    # Use SQLAlchemy's text() for raw SQL
    with db.engine.connect() as connection:
        stmt = text("SELECT emotions FROM userEntry WHERE userId = :user_id")
        emotions = connection.execute(stmt, {"user_id":user_id}).fetchall()

    emotion_dict = {}
    for emotion in emotions:
        for e in emotion[0].split(","):
            if e in emotion_dict:
                emotion_dict[e] += 1
            else:
                emotion_dict[e] = 1

    emotion_list = [{"text": emotion, "value": count} for emotion, count in emotion_dict.items()]

    return emotion_list