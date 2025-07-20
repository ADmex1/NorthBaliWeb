from flask import Flask
# from flask_cors import CORS
from dotenv import load_dotenv
# from flasgger import Swagger
from database.db_endpoint import database_endpoints

load_dotenv

app = Flask(__name__)
#CORS(app)
#Swagger(app)

@app.route('/')
def home():
    return "Testificate"

app.register_blueprint(database_endpoints, url_prefix= '/database')