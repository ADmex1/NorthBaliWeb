import os 
from flask import Blueprint, jsonify, request
from database.database import get_connection
import mysql.connector
from werkzeug.utils import secure_filename
import json
from datetime import datetime, timedelta
from flasgger import swag_from
from api.auth.endpoints import token_required, admin_required
from helper.file_upload import file_upload

admin_endpoints = Blueprint('admin_endpoints', __name__)

@admin_endpoints.route('/user-data', methods=['GET'])
@token_required
@admin_required
def user_data(current_user):
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("SELECT id, email, username, role FROM users")
        users = cursor.fetchall()

        cursor.close()
        conn.close()
        return jsonify({"message": "User data retrieved successfully", "users": users}), 200
    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500


@admin_endpoints.route('/recent-reviews', methods= ['GET'])
@token_required
@admin_required
def recent_reviews(current_user):
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM review ORDER BY created_at DESC LIMIT 5")
        review = cursor.fetchall()
        cursor.close()
        conn.close()
        return jsonify({"{+}": "Recently Posted Reviews", "reviews": review}),200
    except mysql.connector.Error as e:
        return jsonify({"ERR": str(e)}),500
    

@admin_endpoints.route('/destination-data', methods=['GET'])
@token_required
@admin_required
def destination_data(current_user):
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("SELECT * FROM destination")
        destinations = cursor.fetchall()

        cursor.close()
        conn.close()
        return jsonify({"message": "Destination data retrieved successfully", "destinations": destinations}), 200
    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500