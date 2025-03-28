"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from werkzeug.security import generate_password_hash, check_password_hash

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/register', methods=['POST'])
def register():
    email =  request.json.get('email', None)
    password = request.json.get('password', None)
    if not email or not password:
        return jsonify({'msg': 'missing data'}), 400
    exist = User.query.filter_by(email=email).first()
    if exist:
        return jsonify({'msn':'email taken'}), 400
    hashed_password= generate_password_hash(password)
    new_user = User(email=email, password=hashed_password, is_active=True)
    db.session.add(new_user)
    db.session.commit()
    token = create_access_token(identity=str(new_user.id))
    return jsonify({'msg':'ok', 'token':token}), 200

@api.route('/login', methods=['POST'])
def login():
    email= request.json.get('email', None)
    password = request.json.get('password', None)
    if not email or not password:
        return jsonify({'msg': 'missing data'}), 400
    exist = User.query.filter_by(email=email).first()
    if not exist:
        return jsonify({'msg': 'not user found'}), 400
   
    if not check_password_hash(exist.password, password):
        return jsonify({'msg':'email/password wrong'}), 400
    
    token = create_access_token(identity=str(exist.id))
    return jsonify({'msg':'ok', 'token':token}), 200

@api.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    id = get_jwt_identity()
    print('user id--->', id)
    user = User.query.get(id)
    return jsonify({'msn': 'OK', 'user': user.realize()})






