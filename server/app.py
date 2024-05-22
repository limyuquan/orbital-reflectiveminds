from flask import Flask, request, jsonify
from datetime import datetime

app = Flask(__name__)

@app.route('/api', methods=['GET'])
def index():
  return {
    "test": "test"
  }
  
@app.route('/api/submit-new-journal', methods=['POST'])
def submit_new_journal():
    data = request.get_json()
    # Now you can use the data from the request
    date = datetime.now()
    print(data)
    return {
        "status": "success"
    }
    
@app.route('/api/get-entries', methods=['GET'])
def get_previous_journals():
    return {
        "maxPages": 1,
        "currentPage": 1,
        "journals": [
            {
                "title": "My first journal entry",
                "date": "2021-01-01",
                "content": "Today was a great day!",
                "emotion": "happy"
            },
            {
                "title": "My second journal entry",
                "date": "2021-01-02",
                "content": "Today was a bad day!",
                "emotion": "sad"
            },
            {
                "title": "My third journal entry",
                "date": "2021-01-03",
                "content": "Today was a normal day!",
                "emotion": "neutral"
            }
        ]
    }

if __name__ == '__main__':
  app.run(debug=True, host='0.0.0.0')