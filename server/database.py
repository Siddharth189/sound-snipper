from config import *
import pymongo

class Database:
    conn_str = f"mongodb+srv://{USER}:{PASSWORD}@{HOST}/"

    def __init__(self):
        print(self.conn_str)

        client = pymongo.MongoClient(self.conn_str, serverSelectionTimeoutMS=5000)
        try:
            print(client.server_info())
        except Exception as e:
            print("Unable to connect to the server in Atlas. Trying to connect to a local Mongodb instance.\n")
            self.conn_str = f"mongodb://127.0.0.1:27017/"
            client = pymongo.MongoClient(self.conn_str, serverSelectionTimeoutMS=2000)
            try:
                print(client.server_info())
            except Exception as e:
                print("Unable to connect to MongoDb on localhost as well")
                exit()
        
        self.client = client

    def get_audio(self, audio_id):
        client = self.client
        # TODO
        # To return: Audio in Binary

    
    def store_audio(self, username, audio, privacy_int):
        client = self.client
        # TODO

    def delete_audio(self, audio_id):
        client = self.client
        # TODO

    def get_all_saved_audios(self, username):
        client = self.client
        # TODO
        # To return: Array of (audio_id, audio_name, length)

    def get_comments(self, audio_id):
        client = self.client
        # TODO
        # To return: Array of (comment, username, timestamp)

    def store_comment(self, audio_id, username, timestamp, comment):
        client = self.client
        # TODO

    def register_user(self, username, pw_hash, email):
        client = self.client
        # TODO

    def user_exists(self, username):
        client = self.client
        # TODO
        # To return: True or False

    def get_pw(self, username):
        client = self.client
        # TODO
        # To return: password hash of user




if __name__ == '__main__':
    db = Database()