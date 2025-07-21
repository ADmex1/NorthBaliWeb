from flask import Blueprint, jsonify
from api.auth.endpoints import token_required, admin_required
from database.database import get_connection

protected_data_endpoint = Blueprint('protected_data', __name__)


@protected_data_endpoint.route('/user', methods = ['GET'])
@token_required
def user_data(current_user):
    return jsonify({
        'message' : f'Hello {current_user["email"]} !',
        'user': current_user
    }), 200

@protected_data_endpoint.route('/admin', methods = ['GET'])
@token_required
@admin_required
def admin_data(current_user):
    try:
        conn= get_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("SELECT id, email, username, role FROM users")
        users = cursor.fetchall()

        cursor.close()
        conn.close()
        return jsonify({"{+}": f"Hello Web Admin {current_user['username']}! This is Protected Admin Data", 'users': users}),200
    except Exception as e:
        return jsonify({"{-}": str(e)}),500