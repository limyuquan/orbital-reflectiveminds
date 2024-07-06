
from flask import jsonify, Blueprint, Flask, request
from sqlalchemy import text
from db import db

dashboard_routes = Blueprint('dashboard_routes', __name__)

@dashboard_routes.route('/post-bookmark-entries', methods=['POST'])
def post():
    data = request.get_json()
    user_id = data['user_id']
    bookmark_entries = data['bookmark_entries']

    bookmark_entries_str = ','.join(bookmark_entries) if len(bookmark_entries) > 0 else None

    with db.engine.connect() as connection:
        if bookmark_entries_str is None:
            stmt = text("UPDATE users SET bookmark = NULL WHERE userId = :user_id")
            connection.execute(stmt, {"user_id": user_id})
        else:
            stmt = text("UPDATE users SET bookmark = :bookmark_entries WHERE userId = :user_id")
            connection.execute(stmt, {"bookmark_entries": bookmark_entries_str, "user_id": user_id})
        connection.commit()
        
    return {
        "message": "Bookmarks updated successfully"
    }


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

        stmt_bookmark = text("SELECT bookmark FROM users WHERE userId = :user_id")
        result = connection.execute(stmt_bookmark, {"user_id": user_id}).fetchone()

        if result is not None and result[0] is not None:
            bookmark_value = sorted(map(int, result[0].split(',')), reverse=True)
        else:
            bookmark_value = []

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
        "bookmark": bookmark_value,
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
    

    
                            