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
                data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
                conn = get_connection()
                cursor = conn.cursor(dictionary=True)
                cursor.execute("SELECT * FROM users WHERE email = %s", (data['email'],))
                current_user = cursor.fetchone()
                cursor.close()
                conn.close()
                if not current_user:
                    return jsonify({"Error": "User not found!"}), 401
            except:
                return jsonify({"{-}": "Token Invalid"}), 401
            return f(current_user, *args, **kwargs)
        
        return jsonify({"Message": "Token is missing!"}), 401
    return decorated
    

@auth_endpoint.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data or not data.get('email') or not data.get('name') or not data.get('password'):
        return jsonify ({"Message": "You need to insert all of the Credentials!"}),400
    
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM users where email = %s", (data['email'],))
    if cursor.fetchone():
        return jsonify({"Error": "This email is already registered!, Try to use other email"}),400
    
    hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')

    cursor.execute(
        "INSERT INTO users(email, username, password) VALUES(%s, %s, %s)",
        (data['email'], data['name'], hashed_password)
    )
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"{+}": "Registration Success!"}),201

@auth_endpoint.route('/login', methods=['POST'])
def login():
    data=request.get_json()
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({'{+}': 'Insert all credentials!'}),400
    
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM users where email = %s", (data['email'],))
    user = cursor.fetchone()
    cursor.close()
    conn.close()

    if not user or not check_password_hash(user['password'], data['password']):
        return jsonify({"{+}": "Invalid Credentials!"}),401
    
    token = jwt.encode({
        'email' : user['email'],
        'exp': datetime.datetime.utcnow()+(datetime.timedelta(hours=1))
    },app.config['SECRET_KEY'], algorithm="HS256")

    return jsonify({
        'token':token
    }), 200

