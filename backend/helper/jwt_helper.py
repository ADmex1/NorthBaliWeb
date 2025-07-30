from flask_jwt_extended import get_jwt

def get_is_admins():
    decoded_jwt = get_jwt()
    user_is_admins = decoded_jwt.get('is_admins',[])
    return user_is_admins