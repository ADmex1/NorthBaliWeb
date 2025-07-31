from flask import Blueprint, request, jsonify, current_app as app, send_from_directory
from werkzeug.utils import secure_filename
from database.database import get_connection
from api.auth.endpoints import token_required
import os
import datetime
from werkzeug.security import generate_password_hash, check_password_hash
import hashlib
user_endpoints = Blueprint('user_endpoints', __name__)
UPLOAD_FOLDER = 'profileimage'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@user_endpoints.route('/update-profile', methods=['PUT'])
@token_required
def update_profile(current_user):
    try:
        email = request.form.get('email')
        username = request.form.get('username')
        image_file = request.files.get('profile_image')

        if not email or not username:
            return jsonify({"Message": "Email and username are required!"}), 400

        profile_image_path = None
        if image_file:
            filename = secure_filename(image_file.filename)
            unique_filename = f"{current_user['id']}_{datetime.datetime.now().strftime('%Y%m%d%H%M%S')}_{filename}"
            full_path = os.path.join(UPLOAD_FOLDER, unique_filename)
            image_file.save(full_path)
            profile_image_path = unique_filename  

        conn = get_connection()
        cursor = conn.cursor()

        if profile_image_path:
            cursor.execute(
                "UPDATE users SET email = %s, username = %s, profile_image = %s WHERE id = %s",
                (email, username, profile_image_path, current_user['id'])
            )
        else:
            cursor.execute(
                "UPDATE users SET email = %s, username = %s WHERE id = %s",
                (email, username, current_user['id'])
            )

        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({"Message": "Profile updated successfully!"}), 200
    except Exception as e:
        return jsonify({"Error": str(e)}), 500
    

@user_endpoints.route('/me', methods=['GET'])
@token_required
def get_user(current_user):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT id, username, email, profile_image FROM users WHERE id = %s", (current_user['id'],))
    user_data = cursor.fetchone()
    cursor.close()
    conn.close()
    return jsonify(user_data), 200

@user_endpoints.route('/update-password', methods=['PUT'])
@token_required
def update_password(current_user):
    data = request.get_json()
    if not data or not data.get('old_password') or not data.get('new_password'):
        return jsonify({"message": "Old and new passwords are required!"}), 400
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT password FROM users WHERE id = %s", (current_user['id'],))
    user = cursor.fetchone()
    if not user:
        return jsonify({"message": "User not found!"}), 404
    if not check_password_hash(user['password'], data['old_password']):
        return jsonify({"message": "Old password is incorrect!"}), 401
    new_hashed_password = generate_password_hash(data['new_password'])

    cursor.execute(
        "UPDATE users SET password = %s WHERE id = %s",
        (new_hashed_password, current_user['id'])
    )
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({
        "message": "Password updated successfully! Please log in again."
    }), 200