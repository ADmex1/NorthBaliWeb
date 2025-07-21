import os 
from flask import Blueprint, jsonify, request
from  database.database import get_connection
import mysql.connector
from werkzeug.utils import secure_filename
import json
from datetime import datetime
from flasgger import swag_from
from api.auth.endpoints import token_required, admin_required
from helper.file_upload import file_upload
file_upload = "uploads"
os.makedirs(file_upload, exist_ok=True)
from datetime import timedelta
destination_endpoints = Blueprint('destination_endpoints', __name__)

@destination_endpoints.route('/destination-list', methods=['GET'])
def destination_list():
    try: 
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM destination")
        destinations = cursor.fetchall()
        cursor.close()
        conn.close()

        for dest in destinations:
            for key in ['best_time_start', 'best_time_end']:
                if isinstance(dest.get(key), timedelta):
                    total_seconds = int(dest[key].total_seconds())
                    hours = total_seconds // 3600
                    minutes = (total_seconds % 3600) // 60
                    dest[key] = f"{hours:02d}:{minutes:02d}"

         
            for json_field in ['image', 'highlights']:
                if dest.get(json_field):
                    try:
                        dest[json_field] = json.loads(dest[json_field])
                    except:
                        pass 

        return jsonify({"{+} Destination Data": destinations}), 200

    except mysql.connector.Error as e:
        return jsonify({"{-} Error": str(e)}), 500
    

@destination_endpoints.route('/upload', methods=['POST'])
@token_required
@admin_required
def upload_destination(current_user):
    try:
        data = request.get_json()

        required_fields = ["name", "location", "category", "description", "image", "rating", "bestTime", "highlights"]
        for field in required_fields:
            if field not in data:
                return jsonify({"{-} Error": f"{field} is required"}), 400

        name = data["name"]
        location = data["location"]
        category = data["category"]
        description = data["description"]
        image_urls = json.dumps(data["image"])  
        rating = float(data["rating"])
        highlights = json.dumps(data.get("highlights", []))  
        best_time_range = data.get("bestTime", "")
        gmaps_url = data.get("gmapsUrl", "")
        youtube_link = f"https://www.youtube.com/watch?v={data.get('youtubeId')}" if data.get("youtubeId") else None

        # Remove 'WITA' and split into start and end times
        best_time_range = best_time_range.replace("WITA", "").strip()
        try:
            best_time_start, best_time_end = best_time_range.split(" - ")
            best_time_start = best_time_start.strip()
            best_time_end = best_time_end.strip()
        except ValueError:
            return jsonify({"{-} Error": "bestTime format must be 'HH:MM - HH:MM [WITA]'"})

        conn = get_connection()
        cursor = conn.cursor()
        query = """
            INSERT INTO destination
            (name, location, category, description, image, rating, highlights, 
             best_time_start, best_time_end, gmaps_url, youtube_link, admin_id)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        cursor.execute(query, (
            name,
            location,
            category,
            description,
            image_urls,
            rating,
            highlights,
            best_time_start,
            best_time_end,
            gmaps_url,
            youtube_link,
            current_user['id']
        ))
        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({"{+} Success": "Destination uploaded successfully"}), 201

    except Exception as e:
        return jsonify({"{-} Error": str(e)}), 500