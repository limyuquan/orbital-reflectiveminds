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
    print('works')
    

#test dashboard_routes


#test login_routes 