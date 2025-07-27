from flask import Flask, send_from_directory
from flask_cors import CORS
from dotenv import load_dotenv
from flasgger import Swagger
from database.db_endpoint import database_endpoints
from api.auth.endpoints import auth_endpoint
from api.data_protected.endpoints import protected_data_endpoint
from api.userreview.endpoints import userreview_endpoints
from api.destination.endpoints import destination_endpoints
from api.admin.endpoints import admin_endpoints
from api.user.endpoints import user_endpoints
from flask_cors import CORS
import os
import datetime

load_dotenv()

app = Flask(__name__)
CORS(app, supports_credentials=True)
Swagger(app)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'supersecretkey')

app.config['UPLOAD_FOLDER'] = os.path.join(os.getcwd(), 'static/uploads')
app.config['PROFILE_IMAGE_FOLDER'] = os.path.join(os.getcwd(), 'profileimage')
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # Max file size = 16 MB
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'avif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS



@app.route('/')
def home():
    return "Hello :3"
@app.route('/uploads/<path:filename>')
def uploaded_file(filename):
    return send_from_directory('uploads', filename)

@app.route('/profileimage/<path:filename>')
def profile_image(filename):
    return send_from_directory('profileimage', filename)

app.register_blueprint(database_endpoints, url_prefix= '/database')
app.register_blueprint(auth_endpoint, url_prefix='/api/auth')
app.register_blueprint(protected_data_endpoint, url_prefix='/protected')
app.register_blueprint(userreview_endpoints, url_prefix = '/review')
app.register_blueprint(destination_endpoints, url_prefix= '/destination')
app.register_blueprint(admin_endpoints, url_prefix='/admin')
app.register_blueprint(user_endpoints, url_prefix='/user')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = datetime.timedelta(hours=1)

if __name__ == '__main__':
    app.run(debug=True)
