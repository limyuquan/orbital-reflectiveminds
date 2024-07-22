from routes import entry_routes
from models import User, UserEntry
from datetime import datetime, timezone, date


#test entry_routes

def test_test(client):
    response = client.get('/api/entry/test')
    assert response.status_code == 200
    assert b'This is the career kaki user routes' in response.data
    print('Entry Routes Test')

def test_submit_new_journal(client, session):
    print('Test journal submission')
    test_data = {
        "user_id": 1,
        "title": "Test Journal Entry",
        "content": "This is a test entry.",
        "emotion": "Happy",
        "journalTags": "test, sample"
    }

    response = client.post('/api/entry/submit-new-journal', json=test_data)

    print(response.get_data())

    assert response.status_code == 200

def test_update_journal(client, session):
    print('Test update journal')

