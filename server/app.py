import os
from flask import Flask, send_from_directory, request
from flask_cors import CORS

app = Flask(__name__, static_folder='../client/build')
CORS(app)

# Serve React App
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

# APIs


if __name__ == '__main__':
    app.run(use_reloader=True, host='localhost', port=5000, threaded=True)