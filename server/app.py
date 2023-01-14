import os
from flask import Flask, send_from_directory, request, make_response
from flask_cors import CORS
import json

from io import BytesIO
from database import Database
from utils.hash import hash
from utils.rand_str import rand_str
from utils.remove_ext import remove_ext

os.chdir(__file__.replace(os.path.basename(__file__), ''))

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
        response.headers['Access-Control-Allow-Origin'] = request.headers['origin']
        response.headers['Access-Control-Allow-Credentials'] = True
        response.headers['Access-Control-Expose-Headers'] = 'date, etag, access-control-allow-origin, access-control-allow-credentials'

        session[username] = sessID
    return response


@app.route('/signup', methods=['POST'])
def signup():
    username = request.json['username']
    password = request.json['password']
    email = request.json['email']

    pw_hash = hash(password)
    if db.user_exists(username):
        response = make_response("User already exists", 409)
    else:
        db.register_user(username, pw_hash, email)
        response = make_response()
        response.status_code = 200
        response.set_cookie('loginID', username)

        sessID = rand_str()
        response.set_cookie('sessionID', sessID)

        session[username] = sessID

    return response


@app.route('/savedaudios')
def saved_audios():
    loginID = request.cookies.get('loginID')
    sessionID = request.cookies.get('sessionID')
    if not loginID or not sessionID:
        response = make_response("Not Logged in", 401)
    elif session.get(loginID) != sessionID:
        response = make_response("Not Logged in", 401)
        response.delete_cookie('loginID')
        response.delete_cookie('sessionID')
    else:
        audios = db.get_all_saved_audios(loginID)
        response = make_response(json.dumps(
            {
                "audios": audios
            }
        ))
    return response


@app.route('/comments/<int:audioid>', methods=['GET', 'POST'])
def comments(audioid):
    loginID = request.cookies.get('loginID')
    sessionID = request.cookies.get('sessionID')

    privacy_int, username = db.get_audio_privacy(audioid)
    response = make_response()
    if loginID and session.get(loginID) != sessionID:
        response.delete_cookie('loginID')
        response.delete_cookie('sessionID')
        loginID = None
    
    if request.method == 'GET':
        if privacy_int == 0 and loginID != username:
            response.data = "Unauthorized"
            response.status_code = 401
        else:
            comments = db.get_comments(audioid)
            response.status_code = 200
            response.data = comments

    elif request.method == 'POST':
        if privacy_int < 2 and loginID != username:
            response.data = "Unauthorized"
            response.status_code = 401
        elif loginID == username:
            timestamp = request.json['timestamp']
            comment = request.json['comment']
            db.store_comment(audioid, username, timestamp, comment)
            response.status_code = 200
        else:
            response.data = "Not Logged in"
            response.status_code = 401

    return response


@app.route('/audiobin/<int:audioid>', methods=['GET', 'DELETE'])
def audiobin(audioid):
    loginID = request.cookies.get('loginID')
    sessionID = request.cookies.get('sessionID')

    privacy_int, username = db.get_audio_privacy(audioid)
    response = make_response()
    if loginID and session.get(loginID) != sessionID:
        response.delete_cookie('loginID')
        response.delete_cookie('sessionID')
        loginID = None

    if request.method == 'DELETE':
        if loginID != username:
            response.data = "Unauthorized"
            response.status_code = 401
        else:
            db.delete_audio(audioid)
            response.status_code = 200
    
    elif request.method == 'GET':
        if privacy_int == 0 and loginID != username:
            response.data = "Unauthorized"
            response.status_code = 401
        else:
            response.status_code = 200

            buf = BytesIO()
            bin = db.get_audio(audioid)
            buf.write(bin)

            response.data = buf.getvalue()
            buf.close()

            response.headers['Content-Type'] = 'audio/mp3'
            response.headers['Content-Disposition'] = f'attachment; filename={audioid}.mp3'

    return response


@app.route("/audiosend", methods=['POST'])
def audiosend():
    loginID = request.cookies.get('loginID')
    sessionID = request.cookies.get('sessionID')
    print(loginID, sessionID)
    # if not loginID or not sessionID:
    #     response = make_response("Not Logged in", 401)
    # elif session.get(loginID) != sessionID:
    #     response = make_response("Not Logged in", 401)
    #     response.delete_cookie('loginID')
    #     response.delete_cookie('sessionID')
    # else:
    if True:
        if 'file' in request.files:
            privacy_int = request.form['privacy']
            loginID = request.form['username']
            file = request.files['file']
            audio_name = remove_ext(file.filename)
            file.save(f"temp/{file.filename}")
            id = 0

        else:
            url = request.json['url']
            privacy_int = request.json['privacy']
            loginID = request.json['username']
            # path = os.path.join(app.static_folder, f"{name}.ogg")

        # id = db.store_audio(audio, loginID, audio_name, audio_length, privacy_int)

        response = make_response(json.dumps({
            'id': id,
            'name': f"{audio_name}.ogg"
        }), 200)
    return response


@app.route('/test')
def test():
    response = make_response('test response')
    print(response.response)
    response.data = "new response"

    return response



if __name__ == '__main__':
    app.run(use_reloader=True, host='localhost', port=5000, threaded=True)