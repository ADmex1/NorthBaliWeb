from flask_jwt_extended import get_jwt

def get_roles():
    decoded_jwt = get_jwt()
    user_roles = decoded_jwt.get('roles',[])
    return user_roles