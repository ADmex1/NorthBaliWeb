import os 
from flask import Blueprint, jsonify, request
from  database.database import get_connection
import mysql.connector
from werkzeug.utils import secure_filename
from datetime import datetime
from flasgger import swag_from
from api.auth.endpoints import token_required
from helper.file_upload import file_upload


destination_endpoints = Blueprint('destination_endpoints', __name__)


@destination_endpoints.route('/destination-list', methods = ['GET'])
def destination_list():
    try: 
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM destination")
        destination = cursor.fetchall()
        cursor.close()
        conn.close()
        return jsonify({"{+} Destination Data: ": destination }),200
    except mysql.connector.Error as e:
        return jsonify({"{-} Error": str(e)}),500