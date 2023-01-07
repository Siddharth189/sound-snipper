import os
from flask import Flask, send_from_directory, request, make_response
from flask_cors import CORS
from database import Database
from utils.hash import hash
from utils.rand_str import rand_str

app = Flask(__name__, static_folder='../client/build')
CORS(app)

db = Database()
session = {}

# Serve React App
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


# APIs
@app.route('/signin', methods=['POST'])
def signin():
    username = request.json['username']
    pw = request.json['password']

    pw_hash = hash(pw)
    if not db.user_exists(username):
        response = make_response("No username found", 401)
    elif db.get_pw(username) != pw_hash:
        response = make_response("Wrong password", 401)
    else:
        response = make_response()
        response.status_code = 200
        response.set_cookie('loginID', username)

        sessID = rand_str()
        response.set_cookie('sessionID', sessID)

        session[username] = sessID
    return response


@app.route('/signup', methods=['POST'])
def signup():
    username = request.json['username']
    password = request.json['password']
    email = request.json['email']

    pw_hash = hash(password)
    if db.user_exists(username):
        response = make_response("User already exists", 401)
    else:
        db.register_user(username, pw_hash, email)
        response = make_response()
        response.status_code = 200
        response.set_cookie('loginID', username)

        sessID = rand_str()
        response.set_cookie('sessionID', sessID)

        session[username] = sessID

    return response

if __name__ == '__main__':
    app.run(use_reloader=True, host='localhost', port=5000, threaded=True)