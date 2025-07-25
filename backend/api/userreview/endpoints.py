import os 
from flask import Blueprint, jsonify, request
from  database.database import get_connection
import mysql.connector
from werkzeug.utils import secure_filename
from datetime import datetime
from flasgger import swag_from
from api.auth.endpoints import token_required


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
        cursor.execute("SELECT * FROM review")  
        reviews = cursor.fetchall()
        cursor.close()
        conn.close()
        return jsonify({"User Review Datas": reviews}),200
    except mysql.connector.Error as e:
        return jsonify({"Error": str(e)}), 500
    


@userreview_endpoints.route('/upload/<int:destination_id>', methods=['POST'])
@token_required
def upload_review(current_user, destination_id):
    try:
        comment = request.form.get('comment')
        rating_raw = request.form.get("rating")

        try:
            rating = float(rating_raw) if rating_raw is not None else 0.0
        except (TypeError, ValueError):
            return jsonify({"{!}": "Invalid rating value!"}), 400

        conn = get_connection()
        cursor = conn.cursor()

        # Validate destination exists
        cursor.execute("SELECT * FROM destination WHERE id = %s", (destination_id,))
        destination_data = cursor.fetchone()
        if not destination_data:
            return jsonify({"{!}": "Destination not found!"}), 404

        # Insert review
        cursor.execute(
            "INSERT INTO review (comment, rating, user_id, destination_id) VALUES (%s, %s, %s, %s)",
            (comment, rating, current_user['id'], destination_id)
        )
        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({"{+}": "Review uploaded!"}), 201

    except Exception as e:
        print("Upload error:", e)
        return jsonify({"{!}": "Internal server error!"}), 500

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
    except Exception as e:
        return jsonify({"{-} Error": str(e)}), 500

@userreview_endpoints.route('/update/<int:review_id>', methods = ['PUT'])
@token_required
def review_update(current_user, review_id):
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

        # Checks if destination exists
        cursor.execute("SELECT * FROM destination WHERE id = %s", (destination_id,))
        destination_data = cursor.fetchone()
        if not destination_data:
            return jsonify({"{!}": "Destination not found!"}), 404
        
        #Checks if review exists
        cursor.execute("SELECT * FROM review WHERE id = %s", (review_id,))
        review_data = cursor.fetchone()
        if not review_data:
            return jsonify({"{!}": "Review not found!"}), 404

        cursor.execute("SELECT * FROM review WHERE id = %s AND user_id = %s", (review_id, current_user['id']))
        user_review = cursor.fetchone()
        if not user_review:
            return jsonify({"{!}":"You have no authorization to update this review!"}),403
        # Insert the review
        cursor.execute(
            "UPDATE review SET comment=%s, rating=%s, user_id=%s, destination_id=%s WHERE id=%s",
            (comment, rating, current_user['id'], destination_id, review_id)
        )

        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"{+}": "Review Updated!"}), 200

    except Exception as e:
        return jsonify({"{-}": str(e)}), 500
    
@userreview_endpoints.route('/delete/<int:review_id>', methods = ['DELETE'])
@token_required
def delete_review(current_user, review_id):
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)

        # Check if review exists
        cursor.execute("SELECT * FROM review WHERE id = %s", (review_id,))
        review_data = cursor.fetchone()
        if not review_data:
            cursor.close()
            conn.close()
            return jsonify({"{!}": "Review not found!"}), 404

        # Check if user is authorized to delete
        if review_data['user_id'] != current_user['id']:
            cursor.close()
            conn.close()
            return jsonify({"{!}":"You have no authorization to delete this review!"}),403

        # Perform deletion
        cursor.execute("DELETE FROM review WHERE id = %s", (review_id,))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"{+}": "A review has been deleted!"}), 200

    except mysql.connector.Error as e:
        return jsonify({"{-} Error": str(e)}), 500

@userreview_endpoints.route('/rating-average/<int:destination_id>', methods=['GET'])
def rating_average(destination_id):
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("SELECT AVG(rating) as average_rating, COUNT(*) as total_reviews FROM review WHERE destination_id = %s", (destination_id,))
        result = cursor.fetchone()

        cursor.close()
        conn.close()

        if result['total_reviews'] == 0:
            return jsonify({"{!}": "No reviews found for this destination!"}), 404

        average_rating = round(result['average_rating'], 2)
        total_reviews = result['total_reviews']

        return jsonify({
            "Average Rating": average_rating,
            "Total Reviews": total_reviews
        }), 200

    except mysql.connector.Error as e:
        return jsonify({"{-} Error": str(e)}), 500
    except Exception as e:
        return jsonify({"{-} Error": str(e)}), 500

@userreview_endpoints.route('/destination/<int:destination_id>/reviews', methods=['GET'])
def get_destination_reviews(destination_id):
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("""
            SELECT 
                r.id AS review_id, 
                r.comment, 
                r.rating, 
                r.created_at, 
                u.username AS reviewer 
            FROM review r 
            JOIN users u ON r.user_id = u.id 
            WHERE r.destination_id = %s 
            ORDER BY r.created_at DESC
        """, (destination_id,))
        
        reviews = cursor.fetchall()
        cursor.close()
        conn.close()

        if not reviews:
            return jsonify({"{!}": "No reviews found for this destination"}), 404
        for review in reviews:
            if review.get('created_at'):
                review['created_at'] = review['created_at'].strftime('%Y-%m-%d %H:%M:%S')

        return jsonify({"reviews": reviews}), 200

    except mysql.connector.Error as e:
        return jsonify({"{-} DB Error": str(e)}), 500
    except Exception as e:
        return jsonify({"{-} Error": str(e)}), 500