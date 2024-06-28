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
                {"role": "system", "content": "You're a journaling assistant."},
                {"role": "user", "content": "Prompt"}
            ]
        )
        
        print(response.choices[0])
        print(response.choices[0].message)

        return {
            "status":response.choices[0].message.content
        }

    except openai.RateLimitError as e:
       return {"status": "Rate limit exceeded. Please try again later."}
    except openai.APIError as e:
        return {"status": "An error occurred with the OpenAI API."}
    except Exception as e:
        return {"status": str(e)}
    