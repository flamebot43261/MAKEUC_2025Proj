import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import requests
import psycopg

load_dotenv() 

app = Flask(__name__)
CORS(app)

DATABASE_URL = os.environ.get("DATABASE_URL")

# Initialize database connection pool
db_connection = None
if DATABASE_URL:
    try:
        db_connection = psycopg.connect(DATABASE_URL)
        print("✓ Database connected successfully")
    except Exception as e:
        print(f"⚠ Warning: Could not connect to database: {e}")
else:
    print("⚠ Warning: DATABASE_URL not set")


# Define a route for the home page
@app.route('/')
def null_return():
    return None



# Run the application
if __name__ == '__main__':
    app.run()