from flask import Flask, request, jsonify
import spacy
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dateparser import parse
from datetime import datetime, timedelta

# Setup Flask app and CORS
app = Flask(__name__)
CORS(app)

# Setup SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:32301288@localhost:5432/TaskMng'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Define Task model
class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    due_date = db.Column(db.DateTime, nullable=True)
    notified = db.Column(db.Boolean, default=False, nullable=False)  # Set default to False
    use_nlp = db.Column(db.Boolean, default=False, nullable=False)  # Set default to False
    done = db.Column(db.Boolean, default=False, nullable=False)  # Set default to False




# Create the database
with app.app_context():
    db.create_all()

# Initialize Spacy
nlp = spacy.load("en_core_web_sm")

DAY_MAP = {
    "monday": 0,
    "tuesday": 1,
    "wednesday": 2,
    "thursday": 3,
    "friday": 4,
    "saturday": 5,
    "sunday": 6
}

def parse_date(phrase):
    today = datetime.now()
    phrase = phrase.lower()
    for day_name, day_index in DAY_MAP.items():
        if f"by next {day_name}" in phrase or f"by {day_name}" in phrase:
            days_ahead = (day_index - today.weekday() + 7) % 7
            if days_ahead == 0 and f"by next {day_name}" in phrase:
                days_ahead = 7
            return today + timedelta(days=days_ahead)
        if f"next {day_name}" in phrase:
            days_ahead = (day_index - today.weekday() + 7) % 7
            if days_ahead == 0:
                days_ahead = 7
            return today + timedelta(days=days_ahead)
    parsed_date = parse(phrase)
    if parsed_date:
        return parsed_date
    return None

@app.route('/nlp-task', methods=['POST'])
def nlp_task():
    data = request.json
    text = data.get('text', '')

    doc = nlp(text)
    task_title = " ".join([token.text for token in doc if token.dep_ == 'ROOT' or token.dep_ == 'acomp'])

    date_text = next((ent.text for ent in doc.ents if ent.label_ == 'DATE'), None)
    due_date = parse_date(date_text) if date_text else None

    # Insert task into the database
    new_task = Task(title=task_title, due_date=due_date)
    db.session.add(new_task)
    db.session.commit()

    response = {
        'title': task_title,
        'due_date': due_date.isoformat() if due_date else None
    }
    return jsonify(response)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001)
