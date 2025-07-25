import os
from mysql.connector.pooling import MySQLConnectionPool
from dotenv import load_dotenv

load_dotenv

DB_HOST = os.environ.get('DB_HOST')
DB_NAME = os.environ.get('DB_NAME')
DB_USER = os.environ.get('DB_USER')
DB_PASSWORD = os.environ.get('DB_PASSWORD')
DB_POOL_NAME = os.environ.get('DB_POOL_NAME')
POOL_SIZE = int(os.environ.get('POOL_SIZE'))


db_pool = MySQLConnectionPool(
    host = DB_HOST,
    user = DB_USER,
    database = DB_NAME,
    password = DB_PASSWORD,
    pool_size = POOL_SIZE,
    pool_name=DB_POOL_NAME
)

def get_connection():
    connection = db_pool.get_connection()
    connection.autocommit = True
    return connection
