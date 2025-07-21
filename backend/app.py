from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from flasgger import Swagger
from database.db_endpoint import database_endpoints
from api.auth.endpoints import auth_endpoint
from api.data_protected.endpoints import protected_data_endpoint
import os
load_dotenv

app = Flask(__name__)
CORS(app)
Swagger(app)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'supersecretkey')

@app.route('/')
def home():
    return "Testificate"

app.register_blueprint(database_endpoints, url_prefix= '/database')
app.register_blueprint(auth_endpoint, url_prefix='/api/auth')
app.register_blueprint(protected_data_endpoint, url_prefix='/protected')


if __name__ == '__main__':
    app.run(debug=True)
