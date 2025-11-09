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

def result_to_dict(cursor, result):
    columns = [desc[0] for desc in cursor.description]
    return [dict(zip(columns, row)) for row in result]

# --- USER PROFILES CRUD ---

# CREATE a new user profile
@app.route('/users', methods=['POST'])
def create_user_profile():
    data = request.get_json()
    
    # Basic validation
    if not data or not data.get('full_name'):
        return jsonify({'error': 'full_name is a required field'}), 400

    full_name = data.get('full_name')
    university = data.get('university')
    grad_year = data.get('grad_year')
    age = data.get('age')
    cohort = data.get('cohort')
    gender = data.get('gender')

    sql = """
        INSERT INTO user_profiles (full_name, university, grad_year, age, cohort, gender)
        VALUES (%s, %s, %s, %s, %s, %s)
        RETURNING *;
    """
    
    try:
        with psycopg.connect(DATABASE_URL) as conn:
            with conn.cursor() as cur:
                cur.execute(sql, (full_name, university, grad_year, age, cohort, gender))
                new_user = cur.fetchall()
                conn.commit()
                return jsonify(result_to_dict(cur, new_user)[0]), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# READ all user profiles
@app.route('/users', methods=['GET'])
def get_all_user_profiles():
    sql = 'SELECT * FROM user_profiles ORDER BY created_at DESC;'
    try:
        with psycopg.connect(DATABASE_URL) as conn:
            with conn.cursor() as cur:
                cur.execute(sql)
                users = cur.fetchall()
                return jsonify(result_to_dict(cur, users))
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# READ a single user profile by ID
@app.route('/users/<int:user_id>', methods=['GET'])
def get_user_profile(user_id):
    sql = 'SELECT * FROM user_profiles WHERE id = %s;'
    try:
        with psycopg.connect(DATABASE_URL) as conn:
            with conn.cursor() as cur:
                cur.execute(sql, (user_id,))
                user = cur.fetchall()
                if not user:
                    return jsonify({'error': 'User not found'}), 404
                return jsonify(result_to_dict(cur, user)[0])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# UPDATE a user profile by ID
@app.route('/users/<int:user_id>', methods=['PUT'])
def update_user_profile(user_id):
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Request body cannot be empty'}), 400

    full_name = data.get('full_name')
    university = data.get('university')
    grad_year = data.get('grad_year')
    age = data.get('age')
    cohort = data.get('cohort')
    gender = data.get('gender')

    sql = """
        UPDATE user_profiles
        SET full_name = %s, university = %s, grad_year = %s, age = %s, cohort = %s, gender = %s
        WHERE id = %s
        RETURNING *;
    """
    
    try:
        with psycopg.connect(DATABASE_URL) as conn:
            with conn.cursor() as cur:
                cur.execute(sql, (full_name, university, grad_year, age, cohort, gender, user_id))
                updated_user = cur.fetchall()
                conn.commit()
                if not updated_user:
                    return jsonify({'error': 'User not found'}), 404
                return jsonify(result_to_dict(cur, updated_user)[0])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# DELETE a user profile by ID
@app.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user_profile(user_id):
    sql = 'DELETE FROM user_profiles WHERE id = %s RETURNING *;'
    try:
        with psycopg.connect(DATABASE_URL) as conn:
            with conn.cursor() as cur:
                cur.execute(sql, (user_id,))
                deleted_user = cur.fetchall()
                conn.commit()
                if not deleted_user:
                    return jsonify({'error': 'User not found'}), 404
                return jsonify({'message': 'User deleted successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# --- HOUSING LISTINGS CRUD ---

# CREATE a new housing listing
@app.route('/listings', methods=['POST'])
def create_housing_listing():
    data = request.get_json()
    required_fields = ['user_id', 'rotation', 'city_to', 'city_from']
    if not data or not all(field in data for field in required_fields):
        return jsonify({'error': f'Missing required fields: {required_fields}'}), 400

    user_id = data.get('user_id')
    rotation = data.get('rotation')
    city_to = data.get('city_to')
    city_from = data.get('city_from')
    details = data.get('details')

    sql = """
        INSERT INTO housing_listings (user_id, rotation, city_to, city_from, details)
        VALUES (%s, %s, %s, %s, %s)
        RETURNING *;
    """
    
    try:
        with psycopg.connect(DATABASE_URL) as conn:
            with conn.cursor() as cur:
                cur.execute(sql, (user_id, rotation, city_to, city_from, details))
                new_listing = cur.fetchall()
                conn.commit()
                return jsonify(result_to_dict(cur, new_listing)[0]), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# READ all housing listings (with optional filtering)
@app.route('/listings', methods=['GET'])
def get_all_housing_listings():
    # This endpoint can be used for general browsing
    sql = 'SELECT * FROM housing_listings ORDER BY created_at DESC;'
    try:
        with psycopg.connect(DATABASE_URL) as conn:
            with conn.cursor() as cur:
                cur.execute(sql)
                listings = cur.fetchall()
                return jsonify(result_to_dict(cur, listings))
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# READ a single housing listing by ID
@app.route('/listings/<int:listing_id>', methods=['GET'])
def get_housing_listing(listing_id):
    sql = 'SELECT * FROM housing_listings WHERE id = %s;'
    try:
        with psycopg.connect(DATABASE_URL) as conn:
            with conn.cursor() as cur:
                cur.execute(sql, (listing_id,))
                listing = cur.fetchall()
                if not listing:
                    return jsonify({'error': 'Listing not found'}), 404
                return jsonify(result_to_dict(cur, listing)[0])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# UPDATE a housing listing by ID
@app.route('/listings/<int:listing_id>', methods=['PUT'])
def update_housing_listing(listing_id):
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Request body cannot be empty'}), 400

    # For simplicity, this example requires all fields for an update.
    # You could modify this to update only provided fields.
    rotation = data.get('rotation')
    city_to = data.get('city_to')
    city_from = data.get('city_from')
    details = data.get('details')

    sql = """
        UPDATE housing_listings
        SET rotation = %s, city_to = %s, city_from = %s, details = %s
        WHERE id = %s
        RETURNING *;
    """
    
    try:
        with psycopg.connect(DATABASE_URL) as conn:
            with conn.cursor() as cur:
                cur.execute(sql, (rotation, city_to, city_from, details, listing_id))
                updated_listing = cur.fetchall()
                conn.commit()
                if not updated_listing:
                    return jsonify({'error': 'Listing not found'}), 404
                return jsonify(result_to_dict(cur, updated_listing)[0])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# DELETE a housing listing by ID
@app.route('/listings/<int:listing_id>', methods=['DELETE'])
def delete_housing_listing(listing_id):
    sql = 'DELETE FROM housing_listings WHERE id = %s RETURNING *;'
    try:
        with psycopg.connect(DATABASE_URL) as conn:
            with conn.cursor() as cur:
                cur.execute(sql, (listing_id,))
                deleted_listing = cur.fetchall()
                conn.commit()
                if not deleted_listing:
                    return jsonify({'error': 'Listing not found'}), 404
                return jsonify({'message': 'Listing deleted successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# --- COOP appointmentS CRUD ---

# CREATE a new coop appointment
@app.route('/coop-appointments', methods=['POST'])
def create_coop_appointment():
    data = request.get_json()
    required_fields = ['datetime', 'owner_id', 'requestor_id']
    if not data or not all(field in data for field in required_fields):
        return jsonify({'error': f'Missing required fields: {required_fields}'}), 400

    datetime = data.get('datetime')
    owner_id = data.get('owner_id')
    requestor_id = data.get('requestor_id')

    sql = """
        INSERT INTO coop_appointments (datetime, owner_id, requestor_id)
        VALUES (%s, %s, %s)
        RETURNING *;
    """
    
    try:
        with psycopg.connect(DATABASE_URL) as conn:
            with conn.cursor() as cur:
                cur.execute(sql, (datetime, owner_id, requestor_id))
                new_appointment = cur.fetchall()
                conn.commit()
                return jsonify(result_to_dict(cur, new_appointment)[0]), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# READ all coop appointments
@app.route('/coop-appointments', methods=['GET'])
def get_all_coop_appointments():
    sql = 'SELECT * FROM coop_appointments ORDER BY created_at DESC;'
    try:
        with psycopg.connect(DATABASE_URL) as conn:
            with conn.cursor() as cur:
                cur.execute(sql)
                appointments = cur.fetchall()
                return jsonify(result_to_dict(cur, appointments))
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# READ a single coop appointment by ID
@app.route('/coop-appointments/<int:appointment_id>', methods=['GET'])
def get_coop_appointment(appointment_id):
    sql = 'SELECT * FROM coop_appointments WHERE id = %s;'
    try:
        with psycopg.connect(DATABASE_URL) as conn:
            with conn.cursor() as cur:
                cur.execute(sql, (appointment_id,))
                appointment = cur.fetchall()
                if not appointment:
                    return jsonify({'error': 'Coop appointment not found'}), 404
                return jsonify(result_to_dict(cur, appointment)[0])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# READ coop appointments by owner_id
@app.route('/coop-appointments/owner/<int:owner_id>', methods=['GET'])
def get_coop_appointments_by_owner(owner_id):
    sql = 'SELECT * FROM coop_appointments WHERE owner_id = %s ORDER BY created_at DESC;'
    try:
        with psycopg.connect(DATABASE_URL) as conn:
            with conn.cursor() as cur:
                cur.execute(sql, (owner_id,))
                appointments = cur.fetchall()
                return jsonify(result_to_dict(cur, appointments))
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# READ coop appointments by requestor_id
@app.route('/coop-appointments/requestor/<int:requestor_id>', methods=['GET'])
def get_coop_appointments_by_requestor(requestor_id):
    sql = 'SELECT * FROM coop_appointments WHERE requestor_id = %s ORDER BY created_at DESC;'
    try:
        with psycopg.connect(DATABASE_URL) as conn:
            with conn.cursor() as cur:
                cur.execute(sql, (requestor_id,))
                appointments = cur.fetchall()
                return jsonify(result_to_dict(cur, appointments))
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# UPDATE a coop appointment by ID
@app.route('/coop-appointments/<int:appointment_id>', methods=['PUT'])
def update_coop_appointment(appointment_id):
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Request body cannot be empty'}), 400

    datetime = data.get('datetime')
    owner_id = data.get('owner_id')
    requestor_id = data.get('requestor_id')

    sql = """
        UPDATE coop_appointments
        SET datetime = %s, owner_id = %s, requestor_id = %s
        WHERE id = %s
        RETURNING *;
    """
    
    try:
        with psycopg.connect(DATABASE_URL) as conn:
            with conn.cursor() as cur:
                cur.execute(sql, (datetime, owner_id, requestor_id, appointment_id))
                updated_appointment = cur.fetchall()
                conn.commit()
                if not updated_appointment:
                    return jsonify({'error': 'Coop appointment not found'}), 404
                return jsonify(result_to_dict(cur, updated_appointment)[0])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# DELETE a coop appointment by ID
@app.route('/coop-appointments/<int:appointment_id>', methods=['DELETE'])
def delete_coop_appointment(appointment_id):
    sql = 'DELETE FROM coop_appointments WHERE id = %s RETURNING *;'
    try:
        with psycopg.connect(DATABASE_URL) as conn:
            with conn.cursor() as cur:
                cur.execute(sql, (appointment_id,))
                deleted_appointment = cur.fetchall()
                conn.commit()
                if not deleted_appointment:
                    return jsonify({'error': 'Coop appointment not found'}), 404
                return jsonify({'message': 'Coop appointment deleted successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# --- DATABASE EXECUTION HELPER FUNCTION (Replacing db_execute) ---
def execute_db_query(query: str, params: tuple = None, commit: bool = False):
    if not db_connection:
        raise Exception("Database connection is not available.")
    
    # Use a 'with' block for the cursor to ensure it's closed automatically
    with db_connection.cursor() as cur:
        cur.execute(query, params)
        
        if commit:
            db_connection.commit()
            return cur.fetchone() # Return result of INSERT/UPDATE/DELETE RETURNING
        else:
            return cur.fetchall() # Return results of SELECT

# --- CORE SCHEDULING LOGIC ---
def schedule_appointment_with_duration_check(new_datetime_str: str, owner_id: int, requestor_id: int):
    new_datetime = new_datetime_str # e.g., '2026-01-20 14:30:00+00'

    try:
        # --- QUERY 1: CHECK FOR 30-MINUTE OVERLAP CONFLICTS ---
        check_query = """
        SELECT 1
        FROM coop_appointments
        WHERE 
            -- Check if either party is involved in the existing appointment
            (owner_id = %s OR requestor_id = %s)
            AND (
                -- Overlap condition: (New Start < Existing End) AND (New End > Existing Start)
                %s < (datetime + interval '30 minutes') 
                AND (%s + interval '30 minutes') > datetime
            );
        """
        
        # Note: psycopg uses %s for placeholders, regardless of the data type
        conflict_data = (
            owner_id, 
            requestor_id,
            new_datetime, 
            new_datetime
        )
        
        # Execute the SELECT query
        conflicts = execute_db_query(check_query, conflict_data, commit=False)

        # --- LOGIC: PROCESS CHECK RESULT ---
        if conflicts:
            # Conflict found: conflicts will be a list containing at least one [1]
            return {"error": "Conflict: The appointment conflicts with an existing appointment for the owner or requestor within the 30-minute window."}, 409
        
        # --- QUERY 2: INSERT NEW APPOINTMENT ---
        insert_query = """
        INSERT INTO coop_appointments (datetime, owner_id, requestor_id)
        VALUES (%s, %s, %s)
        RETURNING id, created_at, datetime, owner_id, requestor_id;
        """
        insert_data = (new_datetime, owner_id, requestor_id)

        # Execute the INSERT query and COMMIT
        new_appointment_data = execute_db_query(insert_query, insert_data, commit=True)
        
        # The result from RETURNING is a tuple, map it to a dictionary for clarity
        if new_appointment_data:
            appointment_details = {
                "id": new_appointment_data[0],
                "created_at": str(new_appointment_data[1]),
                "datetime": str(new_appointment_data[2]),
                "owner_id": new_appointment_data[3],
                "requestor_id": new_appointment_data[4],
            }
            return {
                "message": "Appointment scheduled successfully (30-minute window confirmed clear).",
                "appointment": appointment_details 
            }, 201
        else:
            return {"error": "Insertion failed with no data returned."}, 500
            
    except Exception as e:
        # If any query fails, rollback the transaction state (if it was mid-insert)
        if db_connection:
            db_connection.rollback()
        # Log the error (e.g., print(e)) and return a generic server error
        return {"error": f"An unexpected database error occurred: {e}"}, 500

# Run the application
if __name__ == '__main__':
    app.run()