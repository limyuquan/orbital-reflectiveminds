import sys, os

from routes import *


def test_app(client):
    response = client.get('/')
    assert response.status_code == 200
    assert b'Hello, World!' in response.data


#test entry_routes
def test_test(client):
    response = client.get('/api/entry/test')
    assert response.status_code == 200
    assert b'This is the career kaki user routes' in response.data
    

def test_submit_new_journal(client):

    payload = {
        "user_id": 1,
        "title": "Test Journal",
        "content": "This is a test journal entry.",
        "emotion": "happy",
        "journalTags": "test,journal"
    }

    return None


#test dashboard_routes


#test login_routes 