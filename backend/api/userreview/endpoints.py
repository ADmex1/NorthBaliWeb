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
    
# @userreview_endpoints.route('/upload', methods=['POST'])
# @token_required
# def upload_review(current_user):
#     try:
#         required =  upload_review(["content,rating, spot_id"])

#         if 'file' not in request.files or request.files['file'].filename == '':
#             return jsonify({"Error" : "No file part in the request"}),400 
#         file = request.files['file']
#         filename = secure_filename(file.filename)
#         fi