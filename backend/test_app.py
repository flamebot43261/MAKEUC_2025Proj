import requests
import json

# Base URL for your Flask API
BASE_URL = "http://127.0.0.1:5000"

def print_separator(title):
    print("\n" + "="*60)
    print(f"  {title}")
    print("="*60)

def print_response(response, operation):
    print(f"\n{operation}")
    print(f"Status Code: {response.status_code}")
    try:
        print(f"Response: {json.dumps(response.json(), indent=2)}")
    except:
        print(f"Response: {response.text}")

# ==================== USER PROFILES TESTS ====================

def test_user_profiles():
    print_separator("TESTING USER PROFILES CRUD")
    
    # CREATE a new user
    print("\n1. CREATE User")
    user_data = {
        "full_name": "John Doe",
        "university": "University of Cincinnati",
        "grad_year": 2026,
        "age": 21,
        "cohort": "Fall 2023",
        "gender": "Male",
        "major": "Computer Science",
        "phone_number": "555-123-4567"
    }
    response = requests.post(f"{BASE_URL}/users", json=user_data)
    print_response(response, "POST /users")
    user_id = response.json().get('id') if response.status_code == 201 else None
    
    # CREATE another user
    print("\n2. CREATE Another User")
    user_data_2 = {
        "full_name": "Jane Smith",
        "university": "Ohio State University",
        "grad_year": 2025,
        "age": 22,
        "cohort": "Spring 2023",
        "gender": "Female",
        "major": "Engineering",
        "phone_number": "555-987-6543"
    }
    response = requests.post(f"{BASE_URL}/users", json=user_data_2)
    print_response(response, "POST /users")
    user_id_2 = response.json().get('id') if response.status_code == 201 else None
    
    # READ all users
    print("\n3. READ All Users")
    response = requests.get(f"{BASE_URL}/users")
    print_response(response, "GET /users")
    
    # READ single user
    if user_id:
        print(f"\n4. READ User by ID ({user_id})")
        response = requests.get(f"{BASE_URL}/users/{user_id}")
        print_response(response, f"GET /users/{user_id}")
    
    # UPDATE user
    if user_id:
        print(f"\n5. UPDATE User ({user_id})")
        updated_data = {
            "full_name": "John Updated Doe",
            "university": "University of Cincinnati",
            "grad_year": 2027,
            "age": 21,
            "cohort": "Fall 2023",
            "gender": "Male",
            "major": "Computer Science & Math",
            "phone_number": "555-123-4567"
        }
        response = requests.put(f"{BASE_URL}/users/{user_id}", json=updated_data)
        print_response(response, f"PUT /users/{user_id}")
    
    # DELETE user (commented out to keep data for other tests)
    # if user_id:
    #     print(f"\n6. DELETE User ({user_id})")
    #     response = requests.delete(f"{BASE_URL}/users/{user_id}")
    #     print_response(response, f"DELETE /users/{user_id}")
    
    return user_id, user_id_2

# ==================== HOUSING LISTINGS TESTS ====================

def test_housing_listings(user_id, user_id_2):
    print_separator("TESTING HOUSING LISTINGS CRUD")
    
    # CREATE a new listing
    print("\n1. CREATE Housing Listing")
    listing_data = {
        "user_id": user_id,
        "rotation": "Fall 2025",
        "city_to": "Chicago",
        "city_from": "Cincinnati",
        "details": "2 bedroom apartment, pet-friendly, near transit"
    }
    response = requests.post(f"{BASE_URL}/listings", json=listing_data)
    print_response(response, "POST /listings")
    listing_id = response.json().get('id') if response.status_code == 201 else None
    
    # CREATE a matching listing
    print("\n2. CREATE Another Housing Listing")
    listing_data_2 = {
        "user_id": user_id_2,
        "rotation": "Fall 2025",
        "city_to": "Cincinnati",
        "city_from": "Chicago",
        "details": "1 bedroom apartment, downtown location"
    }
    response = requests.post(f"{BASE_URL}/listings", json=listing_data_2)
    print_response(response, "POST /listings")
    listing_id_2 = response.json().get('id') if response.status_code == 201 else None
    
    # READ all listings
    print("\n3. READ All Listings")
    response = requests.get(f"{BASE_URL}/listings")
    print_response(response, "GET /listings")
    
    # READ single listing
    if listing_id:
        print(f"\n4. READ Listing by ID ({listing_id})")
        response = requests.get(f"{BASE_URL}/listings/{listing_id}")
        print_response(response, f"GET /listings/{listing_id}")
    
    # UPDATE listing
    if listing_id:
        print(f"\n5. UPDATE Listing ({listing_id})")
        updated_data = {
            "rotation": "Fall 2025",
            "city_to": "Chicago",
            "city_from": "Cincinnati",
            "details": "UPDATED: 2 bedroom apartment, pet-friendly, near transit, gym included"
        }
        response = requests.put(f"{BASE_URL}/listings/{listing_id}", json=updated_data)
        print_response(response, f"PUT /listings/{listing_id}")
    
    # DELETE listing (commented out to keep data)
    # if listing_id:
    #     print(f"\n6. DELETE Listing ({listing_id})")
    #     response = requests.delete(f"{BASE_URL}/listings/{listing_id}")
    #     print_response(response, f"DELETE /listings/{listing_id}")
    
    return listing_id, listing_id_2

# ==================== COOP APPOINTMENTS TESTS ====================

def test_coop_appointments(user_id, user_id_2):
    print_separator("TESTING COOP APPOINTMENTS CRUD")
    
    # CREATE a new coop appointment
    print("\n1. CREATE Coop Appointment")
    appointment_data = {
        "datetime": "2025-12-01T10:00:00",
        "owner_id": user_id,
        "requestor_id": user_id_2
    }
    response = requests.post(f"{BASE_URL}/coop-appointments", json=appointment_data)
    print_response(response, "POST /coop-appointments")
    appointment_id = response.json().get('id') if response.status_code == 201 else None
    
    # CREATE another coop appointment
    print("\n2. CREATE Another Coop Appointment")
    appointment_data_2 = {
        "datetime": "2025-12-15T14:30:00",
        "owner_id": user_id_2,
        "requestor_id": user_id
    }
    response = requests.post(f"{BASE_URL}/coop-appointments", json=appointment_data_2)
    print_response(response, "POST /coop-appointments")
    appointment_id_2 = response.json().get('id') if response.status_code == 201 else None
    
    # READ all coop appointments
    print("\n3. READ All Coop Appointments")
    response = requests.get(f"{BASE_URL}/coop-appointments")
    print_response(response, "GET /coop-appointments")
    
    # READ single coop appointment
    if appointment_id:
        print(f"\n4. READ Coop Appointment by ID ({appointment_id})")
        response = requests.get(f"{BASE_URL}/coop-appointments/{appointment_id}")
        print_response(response, f"GET /coop-appointments/{appointment_id}")
    
    # READ coop appointments by owner_id
    if user_id:
        print(f"\n5. READ Coop Appointments by Owner ID ({user_id})")
        response = requests.get(f"{BASE_URL}/coop-appointments/owner/{user_id}")
        print_response(response, f"GET /coop-appointments/owner/{user_id}")
    
    # READ coop appointments by requestor_id
    if user_id_2:
        print(f"\n6. READ Coop Appointments by Requestor ID ({user_id_2})")
        response = requests.get(f"{BASE_URL}/coop-appointments/requestor/{user_id_2}")
        print_response(response, f"GET /coop-appointments/requestor/{user_id_2}")
    
    # UPDATE coop appointment
    if appointment_id:
        print(f"\n7. UPDATE Coop Appointment ({appointment_id})")
        updated_data = {
            "datetime": "2025-12-05T11:00:00",
            "owner_id": user_id,
            "requestor_id": user_id_2
        }
        response = requests.put(f"{BASE_URL}/coop-appointments/{appointment_id}", json=updated_data)
        print_response(response, f"PUT /coop-appointments/{appointment_id}")
    
    # DELETE coop appointment
    if appointment_id:
        print(f"\n8. DELETE Coop Appointment ({appointment_id})")
        response = requests.delete(f"{BASE_URL}/coop-appointments/{appointment_id}")
        print_response(response, f"DELETE /coop-appointments/{appointment_id}")
    
    return appointment_id, appointment_id_2

# ==================== ERROR HANDLING TESTS ====================

def test_error_handling():
    print_separator("TESTING ERROR HANDLING")
    
    # Test invalid user creation (missing required field)
    print("\n1. Test Invalid User Creation (Missing full_name)")
    invalid_user = {
        "university": "Test University"
    }
    response = requests.post(f"{BASE_URL}/users", json=invalid_user)
    print_response(response, "POST /users (Invalid)")
    
    # Test getting non-existent user
    print("\n2. Test Getting Non-Existent User")
    response = requests.get(f"{BASE_URL}/users/99999")
    print_response(response, "GET /users/99999 (Not Found)")
    
    # Test invalid listing creation (missing required fields)
    print("\n3. Test Invalid Listing Creation")
    invalid_listing = {
        "user_id": 1
    }
    response = requests.post(f"{BASE_URL}/listings", json=invalid_listing)
    print_response(response, "POST /listings (Invalid)")
    
    # Test invalid coop appointment creation (missing required fields)
    print("\n4. Test Invalid Coop Appointment Creation")
    invalid_appointment = {
        "owner_id": 1
    }
    response = requests.post(f"{BASE_URL}/coop-appointments", json=invalid_appointment)
    print_response(response, "POST /coop-appointments (Invalid)")
    
    # Test deleting non-existent record
    print("\n5. Test Deleting Non-Existent Coop Appointment")
    response = requests.delete(f"{BASE_URL}/coop-appointments/99999")
    print_response(response, "DELETE /coop-appointments/99999 (Not Found)")
    
    # Test updating non-existent record
    print("\n6. Test Updating Non-Existent Listing")
    update_data = {
        "rotation": "Spring 2026",
        "city_to": "Boston",
        "city_from": "NYC",
        "details": "Test"
    }
    response = requests.put(f"{BASE_URL}/listings/99999", json=update_data)
    print_response(response, "PUT /listings/99999 (Not Found)")

# ==================== MAIN TEST RUNNER ====================

def run_all_tests():
    print("\n" + "🚀"*30)
    print("  STARTING COMPREHENSIVE API TESTS")
    print("🚀"*30)
    
    try:
        # Test User Profiles
        user_id, user_id_2 = test_user_profiles()
        
        # Test Housing Listings
        if user_id and user_id_2:
            test_housing_listings(user_id, user_id_2)
        
        # Test Coop Appointments
        if user_id and user_id_2:
            test_coop_appointments(user_id, user_id_2)
        
        # Test Error Handling
        test_error_handling()
        
        print_separator("ALL TESTS COMPLETED ✅")
        
    except requests.exceptions.ConnectionError:
        print("\n❌ ERROR: Could not connect to the Flask server.")
        print("Make sure the server is running on http://127.0.0.1:5000")
    except Exception as e:
        print(f"\n❌ ERROR: {str(e)}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    run_all_tests()