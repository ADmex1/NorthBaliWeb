from flask import request, jsonify
from werkzeug.exceptions import BadRequest

def file_upload(required_fields):
    data ={}
    for field in required_fields:
        field_value = request.form.get(field)
        if not field_value:
            err_message = jsonify({"{-}": f"missing required field:{field}"})
            raise BadRequest(response = err_message)
        data[field] = field_value
    return data
        