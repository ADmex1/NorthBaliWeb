import os 
from flask import Blueprint, jsonify, request
from  database.database import get_connection
import mysql.connector
from werkzeug.utils import secure_filename
from datetime import datetime
from flasgger import swag_from
from api.auth.endpoints import token_required
from helper.file_upload import file_upload
userreview_endpoints = Blueprint('userreview_endpoints', __name__)


def default_date_handler(obj):
    if isinstance(obj,datetime):
        return obj.isoformat()
    raise TypeError("Type Not Serialazble")

@userreview_endpoints.route('/all-reviews', methods=['GET'])

def all_reviews():
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM reviews")
        reviews = cursor.fetchall()
        cursor.close()
        conn.close()
        return jsonify({"User Review Datas": reviews}),200
    except mysql.connector.Error as e:
        return jsonify({"Error": str(e)}),500
    
@userreview_endpoints.route('/upload', methods=['POST'])
@token_required
def upload_review(current_user):
    try:
        comment = request.form.get('comment')
        rating = float(request.form.get("rating", 0))
        destination_raw = request.form.get('destination_id')

        if not destination_raw:
            return jsonify({"{!}": "Missing destination_id!"}), 400

        try:
            destination_id = int(destination_raw)
        except ValueError:
            return jsonify({"{!}": "Invalid destination_id!"}), 400

        conn = get_connection()
        cursor = conn.cursor()

        # Validate that destination exists
        cursor.execute("SELECT * FROM destination WHERE id = %s", (destination_id,))
        destination_data = cursor.fetchone()
        if not destination_data:
            return jsonify({"{!}": "Destination not found!"}), 404

        # Insert the review
        cursor.execute(
            "INSERT INTO review (comment, rating, user_id, destination_id) VALUES (%s, %s, %s, %s)",
            (comment, rating, current_user['id'], destination_id)
        )

        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"{+}": "Review uploaded successfully!"}), 201

    except Exception as e:
        return jsonify({"{-}": str(e)}), 500
    

@userreview_endpoints.route('/<int:review_id>', methods=['GET'])
def get_review_by_id(review_id):
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM review WHERE id = %s", (review_id,))
        review = cursor.fetchone()
        cursor.close()
        conn.close()

        if not review:
            return jsonify({"{!}": "Review not found!"}), 404

        return jsonify({"Review Data": review}), 200

    except mysql.connector.Error as e:
        return jsonify({"{-} Error": str(e)}), 500

# @destination_endpoints.route('/upload', methods=['POST'])
# @token_required
# @admin_required
# def upload_destination(current_user):
#     try:
#         name = request.form.get('name')
#         location = request.form.get('location')
#         category = request.form.get('category')
#         description = request.form.get('description')
#         rating = float(request.form.get("rating", 0))
#         best_time_range = request.form.get("bestTime", "")
#         gmaps_url = request.form.get("gmapsUrl")
#         youtube_id = request.form.get('youtube_id', "")
#         youtube_id =        f"https://www.youtube.com/watch?v={youtube_id}" if youtube_id else None

#         highlights_list = request.form.getlist("highlights")
#         highlights_json = json.dumps(highlights_list)

#         best_time_range = best_time_range.replace("WITA", "").strip()
#         try:
#             best_time_start, best_time_end = [t.strip() for t in best_time_range.split(" - ")]
#         except ValueError:
#             return jsonify({"error": "bestTime format must be 'HH:MM - HH:MM [WITA]'"}), 400

#         image_files = request.files.getlist("image")
#         if not image_files:
#             return jsonify({"{-}": "The file has to be image format"}), 400

#         image_urls = []
#         for file in image_files:
#             if file and file.filename:
#                 filename = secure_filename(file.filename)
#                 filepath = os.path.join(upload_folder, filename)
#                 file.save(filepath)
#                 image_urls.append(f"/{upload_folder}/{filename}")

#         image_json = json.dumps(image_urls)

#         conn = get_connection()
#         cursor = conn.cursor()
#         cursor.execute("""
#             INSERT INTO destination
#             (name, location, category, description, image, rating, highlights, 
#             best_time_start, best_time_end, gmaps_url, youtube_id, admin_id)
#             VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
#         """, (
#             name, location, category, description, image_json, rating,
#             highlights_json, best_time_start, best_time_end,
#             gmaps_url, youtube_id, current_user['id']
#         ))
#         conn.commit()
#         cursor.close()
#         conn.close()

#         return jsonify({"{+} Success": "Uploaded"}), 201

#     except Exception as e:
#         return jsonify({"{-} Error": str(e)}), 500
