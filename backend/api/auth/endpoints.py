from flask import Blueprint, request, jsonify, current_app as app
from werkzeug.security import generate_password_hash, check_password_hash
from database.database import get_connection
import jwt
import datetime
from functools import wraps


auth_endpoint = Blueprint('auth', __name__)
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            try:
                token = request.headers['Authorization'].split(" ")[1]
                if not token:
                    return jsonify({"Message": "Token is missing"}), 401

                # Decode token
                data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])

                # Fetch user from DB
                conn = get_connection()
                cursor = conn.cursor(dictionary=True)
                cursor.execute("SELECT * FROM users WHERE email = %s", (data['email'],))
                current_user = cursor.fetchone()
                cursor.close()
                conn.close()

                if not current_user:
                    return jsonify({"Error": "User not found!"}), 401

            except jwt.ExpiredSignatureError:
                return jsonify({"Error": "Token expired"}), 401
            except jwt.InvalidTokenError:
                return jsonify({"Error": "Token is invalid"}), 401
            except Exception as e:
                return jsonify({"Error": f"Token processing failed: {str(e)}"}), 401

            return f(current_user, *args, **kwargs)

        return jsonify({"Message": "Authorization header missing!"}), 401
    return decorated


def admin_required(f):
    @wraps(f)
    def decorated(current_user, *args, **kwargs):
        if current_user['role'] != 'admin':
            return jsonify({'{!}': 'Access Denied!'}),403
        return f (current_user, *args, **kwargs)
    return decorated

@auth_endpoint.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data or not data.get('email') or not data.get('username') or not data.get('password'):
        return jsonify({"Message": "You need to insert all of the credentials!"}), 400

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM users WHERE email = %s", (data['email'],))
    if cursor.fetchone():
        return jsonify({"Error": "This email is already registered!"}), 400

    cursor.execute("SELECT COUNT(*) AS user_count FROM users")
    user_count = cursor.fetchone()['user_count']

    role = data.get('role', 'user') 
    if role == 'admin':
        if user_count > 0:
            if 'Authorization' not in request.headers:
                return jsonify({"Message": "Admin privilege required"}), 403
            token = request.headers['Authorization'].split(" ")[1]
            try:
                token_data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
                cursor.execute("SELECT * FROM users WHERE email = %s", (token_data['email'],))
                requester = cursor.fetchone()
                if not requester or requester['role'] != 'admin':
                    return jsonify({"Message": "Admin privilege required"}), 403
            except:
                return jsonify({"Message": "Invalid token"}), 401

    hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')

    cursor.execute(
        "INSERT INTO users (email, username, password, role) VALUES (%s, %s, %s, %s)",
        (data['email'], data['username'], hashed_password, role)
    )
    conn.commit()
    cursor.close()
    conn.close()
    token = jwt.encode({
        'id': data['email'],
        'email': data['email'],
        'username': data['username'],
        'exp': datetime.datetime.utcnow() + app.config['JWT_ACCESS_TOKEN_EXPIRES']
    }, app.config['SECRET_KEY'], algorithm='HS256')


    return jsonify({
    "message": "Registration Success",
    "token": token,
    "users": {
        "username": data['username'],
        "email": data['email']
    }
}), 201


@auth_endpoint.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({'message': 'Email and password required!'}), 400

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM users WHERE email = %s", (data['email'],))
    user = cursor.fetchone()
    cursor.close()
    conn.close()

    if not user or not check_password_hash(user['password'], data['password']):
        return jsonify({'message': 'Email or password is invalid, Please put the right credentials!'}), 401

    token = jwt.encode({
        'id': user['id'],
        'email': user['email'],
        'username': user['username'], 
        'exp': datetime.datetime.utcnow() + app.config['JWT_ACCESS_TOKEN_EXPIRES']
    }, app.config['SECRET_KEY'], algorithm='HS256')

    return jsonify({
        'user': {
            'username': user['username'],  
            'email': user['email'],
        },
        "token": token
    }), 200

