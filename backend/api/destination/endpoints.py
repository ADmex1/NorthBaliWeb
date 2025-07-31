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

upload_folder = "uploads"
os.makedirs(upload_folder, exist_ok=True)

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
                    except Exception:
                        pass 
            dest.pop('admin_id', None)
        return jsonify(destinations), 200  # <-- Return as a plain array

    except mysql.connector.Error as e:
        return jsonify({"error": str(e)}), 500
    
@destination_endpoints.route('/<int:destination_id>', methods=['GET'])
def get_destination_by_id(destination_id):
    try: 
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM destination WHERE id = %s", (destination_id,))
        destinations = cursor.fetchall()
        cursor.close()
        conn.close()

        if not destinations:
            return jsonify({"{-} Error": "Destination not found"}), 404

        dest = destinations[0]
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
        dest.pop('admin_id', None)
        return jsonify({"{+} Destination Data": dest}), 200

    except mysql.connector.Error as e:
        return jsonify({"{-} Error": str(e)}), 500
    
@destination_endpoints.route('/upload', methods=['POST'])
@token_required
@admin_required
def upload_destination(current_user):
    try:
        name = request.form.get('name')
        location = request.form.get('location')
        category = request.form.get('category')
        description = request.form.get('description')
        rating = float(request.form.get("rating", 0))
        best_time_range = request.form.get("bestTime", "")
        gmaps_url = request.form.get("gmapsUrl")
        youtube_id = request.form.get('youtube_id', "")
        youtube_id = f"https://www.youtube.com/watch?v={youtube_id}" if youtube_id else None

        highlights_list = request.form.getlist("highlights")
        highlights_json = json.dumps(highlights_list)

        # === Best Time Parsing ===
        best_time_range = best_time_range.replace("WITA", "").strip()
        try:
            best_time_start_str, best_time_end_str = [t.strip() for t in best_time_range.split(" - ")]
            best_time_start = datetime.strptime(best_time_start_str, "%H:%M").time()
            best_time_end = datetime.strptime(best_time_end_str, "%H:%M").time()
        except ValueError:
            return jsonify({"error": "bestTime format must be 'HH:MM - HH:MM WITA'"}), 400

        # === Image Processing ===
        image_files = request.files.getlist("image")
        if not image_files:
            return jsonify({"{-}": "The file has to be image format"}), 400

        image_urls = []
        for file in image_files:
            if file and file.filename:
                filename = secure_filename(file.filename)
                filepath = os.path.join(upload_folder, filename)
                file.save(filepath)
                image_urls.append(f"/{upload_folder}/{filename}")

        image_json = json.dumps(image_urls)

        # === Database Insert ===
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO destination
            (name, location, category, description, image, rating, highlights, 
            best_time_start, best_time_end, gmaps_url, youtube_id, admin_id)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (
            name, location, category, description, image_json, rating,
            highlights_json, best_time_start, best_time_end,
            gmaps_url, youtube_id, current_user['id']
        ))
        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({"{+} Success": "Uploaded"}), 201

    except Exception as e:
        return jsonify({"{-} Error": str(e)}), 500

@destination_endpoints.route('/update/<int:destination_id>', methods=['PUT'])
@token_required
@admin_required
def update_destination(current_user, destination_id):
    try:
        data = request.form
        image_files = request.files.getlist("image")
        replace_images = data.get("replace_images", "false").lower() == "true"
        if not data.get("name"):
            return jsonify({"{-} Error": "name is required"}), 400
        conn = get_connection()
        cursor = conn.cursor()
        if replace_images:
            if image_files and any(img.filename for img in image_files):
                image_filenames = []
                for img in image_files:
                    if img.filename:
                        filename = secure_filename(img.filename)
                        filepath = os.path.join(upload_folder, filename)
                        img.save(filepath)
                        # Save with path relative to static or URL base
                        image_filenames.append(f"uploads/{filename}")
                image_urls = json.dumps(image_filenames)
            else:
                image_urls = json.dumps([])
        else:
            cursor.execute("SELECT image FROM destination WHERE id = %s", (destination_id,))
            result = cursor.fetchone()
            image_urls = result['image'] if result else json.dumps([])
        highlights = data.getlist("highlights")
        best_time = data.get("bestTime", "")
        try:
            best_time_start, best_time_end = best_time.replace("WITA", "").strip().split(" - ")
        except ValueError:
            return jsonify({"{-} Error": "bestTime format must be 'HH:MM - HH:MM'"}), 400
        cursor.execute("""
            UPDATE destination SET
                name = %s,
                location = %s,
                category = %s,
                description = %s,
                image = %s,
                rating = %s,
                highlights = %s,
                best_time_start = %s,
                best_time_end = %s,
                gmaps_url = %s,
                youtube_id = %s,
                admin_id = %s
            WHERE id = %s
        """, (
            data.get("name"),
            data.get("location"),
            data.get("category"),
            data.get("description"),
            image_urls,
            float(data.get("rating", 0)),
            json.dumps(highlights),
            best_time_start.strip(),
            best_time_end.strip(),
            data.get("gmaps_url"),
            f"https://www.youtube.com/watch?v={data.get('youtube_id')}",
            current_user['id'],
            destination_id
        ))
        conn.commit()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM destination WHERE id = %s", (destination_id,))
        updated = cursor.fetchone()
        cursor.close()
        conn.close()
        if not updated:
            return jsonify({"{-} Error": "Destination not found"}), 404
        return jsonify({
            "message": "Destination updated successfully",
            "destination": {
                "id": updated["id"],
                "name": updated["name"],
                "location": updated["location"],
                "category": updated["category"],
                "description": updated["description"],
                "image": json.loads(updated["image"]) if updated.get("image") else [],
                "rating": updated["rating"],
                "highlights": updated["highlights"],
                "best_time_start": updated["best_time_start"],
                "best_time_end": updated["best_time_end"],
                "gmaps_url": updated["gmaps_url"],
                "youtube_id": updated["youtube_id"],
            }
        }), 200
    except Exception as e:
        return jsonify({"{-} Error": str(e)}), 500

@destination_endpoints.route('/delete/<int:destination_id>', methods=['DELETE'])
@token_required
@admin_required
def delete_destination(current_user, destination_id):
    try:
        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute("SELECT image FROM destination WHERE id = %s", (destination_id,))
        destination = cursor.fetchone()
        if not destination:
            return jsonify({"{-} Error": "The Destination spot does not exist"}), 404

        # Delete destination row
        cursor.execute("DELETE FROM destination WHERE id = %s", (destination_id,))
        conn.commit()
        cursor.close()
        conn.close()

        # Delete image files
        image_json = destination[0]
        try:
            image_list = json.loads(image_json)
            deleted = []
            for path in image_list:
                file_path = path.lstrip("/")
                if os.path.exists(file_path):
                    os.remove(file_path)
                    deleted.append(file_path)
            return jsonify({"{+} Success": f"Deleted {len(deleted)} image(s) and destination"}), 200
        except Exception as e:
            return jsonify({"{-} Warning": f"Destination deleted, but image deletion failed: {str(e)}"}), 200

    except mysql.connector.Error as e:
        return jsonify({"{-} Error": str(e)}), 500

@destination_endpoints.route('/review/<int:destination_id>', methods=['GET'])
def get_destination_reviews(destination_id):
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM review WHERE destination_id = %s", (destination_id,))
        reviews = cursor.fetchall()
        cursor.close()
        conn.close()

        if not reviews:
            return jsonify({"{!}": "No reviews found for this destination"}), 404

        return jsonify({"Reviews": reviews}), 200

    except mysql.connector.Error as e:
        return jsonify({"{-} Error": str(e)}), 500
    
@destination_endpoints.route('/review-average/<int:destination_id>', methods=['GET'])
def get_average_rating(destination_id):
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT AVG(rating) AS average_rating, COUNT(*) AS total_reviews FROM review WHERE destination_id = %s", (destination_id,))
        result = cursor.fetchone()
        cursor.close()
        conn.close()

        if not result or result['total_reviews'] == 0:
            return jsonify({"{!}": "No reviews found for this destination"}), 404

        average_rating = round(result['average_rating'], 2)
        total_reviews = result['total_reviews']

        return jsonify({"Average Rating": average_rating, "Total Reviews": total_reviews}), 200

    except mysql.connector.Error as e:
        return jsonify({"{-} Error": str(e)}), 500