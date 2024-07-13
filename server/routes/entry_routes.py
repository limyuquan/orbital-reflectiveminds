import logging
logger = logging.getLogger(__name__)
from flask import jsonify, Blueprint, Flask, request
from datetime import datetime
from sqlalchemy import text
from db import db

import os

import openai
from openai import OpenAI

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
    journalTags = data['journalTags']
    date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    try:
        with db.engine.connect() as connection:
            stmt = text("INSERT INTO userEntry (userId, startDate, title, body, emotions, journal_tags) VALUES (:user_id, :date, :title, :content, :emotion, :journalTags)")
            connection.execute(stmt, {"user_id":user_id, "date":date, "title":title, "content":content, "emotion":emotion, "journalTags":journalTags})
            stmt = text("UPDATE users SET last_entry = :date WHERE userId = :user_id")
            connection.execute(stmt, {"date":date, "user_id":user_id})
            connection.commit()
            stmt = text("SELECT achievements FROM users where userId = :userId")
            current_achievements_str = connection.execute(stmt, {"userId":user_id}).fetchone()[0]
            if current_achievements_str is None:
                current_achievements_str = ""
            stmt = text("SELECT entryId as entryID, title, startDate as date, body as content, emotions as emotion, journal_tags as tags, bookmark as bookmark FROM userEntry WHERE userId = :user_id ORDER BY entryId DESC")
            entries = connection.execute(stmt, {"user_id":user_id}).fetchall()
            all_journals = [{"id": index, "entryID": entryID,  "title": title, "date": date.strftime("%Y-%m-%d"), "content": content,"emotion": emotion,"tags": tags, "bookmark": bookmark} for index, (entryID, title, date, content, emotion, tags, bookmark) in enumerate(entries)]
            achievements, new_achievements = new_check_achievements(all_journals, current_achievements_str)
            stmt = text("UPDATE users SET achievements = :achievements WHERE userId = :user_id")
            connection.execute(stmt, {"achievements":achievements, "user_id":user_id})
            connection.commit()
            
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }
        
    return {
        "status": "success",
        "new_achievements": new_achievements
    }
    
@entry_routes.route('/update-journal', methods=['POST'])
def update_journal():
    data = request.get_json()
    user_id = data['user_id']
    entry_id = data['entry_id']
    title = data['title']
    content = data['content']
    emotion = data['emotion']
    journalTags = data['journalTags']
    date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    try:
        with db.engine.connect() as connection:
            stmt = text("UPDATE userEntry SET startDate = :date, title = :title, body = :content, emotions = :emotion, journal_tags = :journalTags WHERE entryId = :entry_id")
            connection.execute(stmt, {"date":date, "title":title, "content":content, "emotion":emotion, "journalTags":journalTags, "entry_id":entry_id})
            stmt = text("UPDATE users SET last_entry = :date WHERE userId = :user_id")
            connection.execute(stmt, {"date":date, "user_id":user_id})
            connection.commit()
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }
        
    return {
        "status": "success"
    }


@entry_routes.route('/open-ai', methods=['POST'])
def promptOpenAI():
    #make openai call here!
    try :
        client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You're a journaling assistant. Generate a unique short journaling prompt < 15 words for a user who wants to write about their day"},
                {"role": "user", "content": "Prompt"}
            ]
        )
        
        return {
            "status":response.choices[0].message.content
        }

    except openai.RateLimitError as e:
       return {"status": "Rate limit exceeded. Please try again later."}
    except openai.APIError as e:
        return {"status": "An error occurred with the OpenAI API."}
    except Exception as e:
        return {"status": str(e)}

def new_check_achievements(journals, achievements):
    cur_streaks = check_current_streaks(journals)
    achievements_lst = achievements.split(",")
    if cur_streaks >= 1 and "0" not in achievements_lst:
        achievements = add_achievement(achievements, "0")
    if cur_streaks >= 5 and "1" not in achievements_lst:
        achievements = add_achievement(achievements, "1")
    if cur_streaks >= 10 and "2" not in achievements_lst:
        achievements = add_achievement(achievements, "2")
    if cur_streaks >= 25 and "3" not in achievements_lst:
        achievements = add_achievement(achievements, "3")
    if cur_streaks >= 50 and "4" not in achievements_lst:
        achievements = add_achievement(achievements, "4")
    if cur_streaks >= 100 and "5" not in achievements_lst:
        achievements = add_achievement(achievements, "5")
    total_words = sum([len(journal['content'].split()) for journal in journals])
    if total_words >= 500 and "6" not in achievements_lst:
        achievements = add_achievement(achievements, "6")
    if total_words >= 1000 and "7" not in achievements_lst:
        achievements = add_achievement(achievements, "7")
    if total_words >= 2000 and "8" not in achievements_lst:
        achievements = add_achievement(achievements)
    new_achievements = [achievement for achievement in achievements.split(",") if achievement not in achievements_lst]
    return achievements, new_achievements

def add_achievement(str_achievement, new_achievement):
    if str_achievement == "":
        return new_achievement
    else:
        return str_achievement + "," + new_achievement
    
def check_current_streaks(journals):
    dates = [datetime.strptime(journal['date'], "%Y-%m-%d") for journal in journals]
    dates.sort(reverse=True)

    streak = 0
    currentDate = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)

    for i, entryDate in enumerate(dates):
        entryDate = entryDate.replace(hour=0, minute=0, second=0, microsecond=0)
        diffDays = (currentDate - entryDate).days

        if diffDays == 1:
            streak += 1
            currentDate = entryDate
        elif diffDays > 1:
            break
        elif diffDays == 0 and i == 0:
            streak += 1
            currentDate = entryDate

    return streak


@entry_routes.route('/delete-journal-entry', methods=['POST'])
def delete_journal_entry():
    data = request.get_json()
    entry_id = data.get('entryID')
    user_id = data.get('user_id')

    if not entry_id or not user_id:
        return jsonify({"status": "error", "message": "entryID and user_id are required"}), 400
    
    try:
        with db.engine.connect() as connection:
            # Check if the entry exists and belongs to the user
            stmt = text("SELECT COUNT(*) FROM userEntry WHERE entryId = :entry_id AND userId = :user_id")
            result = connection.execute(stmt, {"entry_id": entry_id, "user_id": user_id}).fetchone()[0]

            if result == 0:
                return jsonify({"status": "error", "message": "Entry not found or does not belong to the user"}), 404

            # Delete the entry
            stmt = text("DELETE FROM userEntry WHERE entryId = :entry_id AND userId = :user_id")
            connection.execute(stmt, {"entry_id": entry_id, "user_id": user_id})
            connection.commit()

            return jsonify({"status": "success", "message": "Entry deleted successfully"}), 200

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
