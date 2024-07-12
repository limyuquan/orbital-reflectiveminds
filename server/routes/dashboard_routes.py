
from flask import jsonify, Blueprint, Flask, request
from sqlalchemy import text
from db import db
from datetime import datetime

dashboard_routes = Blueprint('dashboard_routes', __name__)


@dashboard_routes.route('/put-bookmark', methods=['PUT'])
def put_bookmark():
    data = request.get_json()
    user_id = data['user_id']
    entry_id = data['entry_id']

    try:

        with db.engine.connect() as connection:
            stmt = text("UPDATE userEntry SET bookmark = NOT bookmark WHERE userId = :user_id AND entryId = :entry_id")
            connection.execute(stmt, {'user_id': user_id, 'entry_id': entry_id})
            connection.commit()

    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }
    
    return {
        "message": "Bookmarks updated successfully"
    }


@dashboard_routes.route('/get-entries', methods=['POST'])
def get_previous_journals():
    data = request.get_json()
    user_id = data['user_id']
    cur_page = data['curPage']
    filtered_tags = data['filtered_tags']
    search_query = data['search_query']

    # Use SQLAlchemy's text() for raw SQL
    with db.engine.connect() as connection:
        stmt = text("SELECT entryId as entryID, title, startDate as date, body as content, emotions as emotion, journal_tags as tags, bookmark as bookmark FROM userEntry WHERE userId = :user_id ORDER BY entryId DESC")
        entries = connection.execute(stmt, {"user_id":user_id}).fetchall()

    all_journals = [{"id": index, "entryID": entryID,  "title": title, "date": date.strftime("%Y-%m-%d"), "content": content,"emotion": emotion,"tags": tags, "bookmark": bookmark} for index, (entryID, title, date, content, emotion, tags, bookmark) in enumerate(entries)]

    filteredEntriesArray = []
    for entry in all_journals:
        if (len(filtered_tags) != 0):  #no filters
            tag_array = entry['tags'].split(',')
        
            entry_tags_set = set(tag_array)
            filtered_tags_set = set(filtered_tags)

            if filtered_tags_set.issubset(entry_tags_set):
                    filteredEntriesArray.append(entry)
        elif (search_query != ""):
            if search_query.lower() in entry['title'].lower() or search_query.lower() in entry['content'].lower():
                filteredEntriesArray.append(entry)
        
        
        
    maxPages = (len(all_journals) - 1)// 5 + 1
    start_index = cur_page * 5 - 5
    end_index = min(cur_page * 5, len(all_journals))
    journals = all_journals[start_index:end_index] 
    tags = [entry["tags"] for entry in all_journals]

    return {
        "maxPages": maxPages,
        "currentPage": cur_page,
        "journals": journals if len(filteredEntriesArray) == 0 and len(filtered_tags) == 0 else filteredEntriesArray[start_index:end_index],
        "all_journals": all_journals[:],
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

@dashboard_routes.route('/get-active-days', methods=['POST'])
def get_active_days():
    data = request.get_json()
    user_id = data['user_id']
    year = data['year']
    month = data['month']
    with db.engine.connect() as connection:
        stmt = text("""
            SELECT DISTINCT EXTRACT(DAY FROM startDate) as activeDay
            FROM userEntry
            WHERE userId = :user_id
            AND EXTRACT(YEAR FROM startDate) = :year
            AND EXTRACT(MONTH FROM startDate) = :month
            ORDER BY activeDay
        """)
        result = connection.execute(stmt, {"user_id": user_id, "year": year, "month": month}).fetchall()

    # Extracting days from the result
    active_days = [int(row[0]) for row in result]
    return {"active_days": active_days}

@dashboard_routes.route('/get-entries-with-date', methods=['POST'])
def get_entries_with_date():
    try:
        data = request.get_json()
        user_id = data['user_id']
        year = data['year']
        month = data['month']
        day = data['day']
        with db.engine.connect() as connection:
            stmt = text("""
                SELECT entryId as entryID, title, startDate as date, body as content, emotions as emotion, journal_tags as tags
                FROM userEntry
                WHERE userId = :user_id
                AND EXTRACT(YEAR FROM startDate) = :year
                AND EXTRACT(MONTH FROM startDate) = :month
                AND EXTRACT(DAY FROM startDate) = :day
                ORDER BY entryId DESC
            """)
            entries = connection.execute(stmt, {"user_id": user_id, "year": year, "month": month, "day": day}).fetchall()
            
        all_journals = [{"entryID": entryID, "title": title, "date": date.strftime("%Y-%m-%d"), "content": content,"emotion": emotion,"tags": tags} for entryID, title, date, content, emotion, tags in entries]
        return all_journals
    except:
        return {"error": "An error occurred while fetching entries with date"}
    

@dashboard_routes.route('/get-achievements', methods=['POST'])
def get_achievements():
    data = request.get_json()
    user_id = data['user_id']
    with db.engine.connect() as connection:
        stmt = text("SELECT achievements, created_at FROM users WHERE userId = :user_id")
        result = connection.execute(stmt, {"user_id": user_id}).fetchone()
        achievements, created_at = result
        achievements = [] if achievements is None else achievements.split(",")
        created_at = created_at.strftime("%Y-%m-%d %H:%M:%S") if created_at else None
        stmt = text("SELECT entryId as entryID, title, startDate as date, body as content, emotions as emotion, journal_tags as tags, bookmark as bookmark FROM userEntry WHERE userId = :user_id ORDER BY entryId DESC")
        entries = connection.execute(stmt, {"user_id":user_id}).fetchall()
    
    all_journals = [{"id": index, "entryID": entryID,  "title": title, "date": date.strftime("%Y-%m-%d"), "content": content,"emotion": emotion,"tags": tags, "bookmark": bookmark} for index, (entryID, title, date, content, emotion, tags, bookmark) in enumerate(entries)]
    stats = {
        "daysSinceJoined": get_days_since_joined(created_at),
        "totalEntries": get_total_entries(all_journals),
        "totalWords": get_total_words(all_journals),
        "averageWordsPerEntry": get_average_words_per_entry(all_journals),
        "currentStreak": get_current_streaks(all_journals)
    }
    return {
        "achievements": achievements,
        "statistics": stats
        }

def get_days_since_joined(created_at):
    created_at = datetime.strptime(created_at, "%Y-%m-%d %H:%M:%S")
    today = datetime.now()
    return (today - created_at).days

def get_total_words(all_journals):
    total_words = 0
    for journal in all_journals:
        total_words += len(journal['content'].split())
    return total_words

def get_total_entries(all_journals):
    return len(all_journals)

def get_average_words_per_entry(all_journals):
    total_words = get_total_words(all_journals)
    total_entries = get_total_entries(all_journals)
    return total_words // total_entries

def get_current_streaks(journals):
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