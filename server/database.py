from config import *
import pymongo
import datetime

arr_audio = []
arr_comments = []

class Database:
    conn_str = f"mongodb+srv://{USER}:{PASSWORD}@{HOST}/"

    def __init__(self) -> None:
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


    def get_audio(self, audio_id: int):
        client = self.client
        db = client.SoundSnipper
        col = db.Audio
        x = col.find({'audio_id': audio_id})
        return x.audio
    
    def store_audio(self, audio_id: int, audio, username: str, audio_name: str, audio_length: int, privacy_option: int):
        client = self.client
        db = client.SoundSnipper
        col = db.Audio
        rec = {
            "audio_id": audio_id,
            "audio": audio,
            "username": username,
            "audio_name": audio_name,
            "audio_length": audio_length,
            "comments": [],
            "privacy_option": privacy_option
        }
        rec_id = col.insert_one(rec)
        

    def delete_audio(self, audio_id: int):
        client = self.client
        db = client.SoundSnipper
        col = db.Audio
        result = col.delete_one({"audio_id": audio_id})


    def get_all_saved_audios(self, username: str) -> list[tuple[int, str, int]]:
        client = self.client
        db = client.SoundSnipper
        col = db.Audio
        x = col.find({'username': username},{"audio_id": 1, "audio_name": 1, "length": 1, "id": 0})
        for rec in x:
            arr_audio.append(rec)
        return arr_audio

    def get_comments(self, audio_id: int) -> list[tuple[str, str, str]]:
        client = self.client
        db = client.SoundSnipper
        col = db.Audio
        x = col.find({'audio_id': audio_id})
        return x.comments
        

    def store_comment(self, audio_id: int, username: str, timestamp: str, comment: str):
        client = self.client
        db = client.SoundSnipper
        col = db.Audio
        rec = {
            "username": username,
            "timestamp": timestamp,
            "comment": comment
        }
        col.update_one({'audio_id': audio_id}, {'$push': {'comments': rec}})
        
      

    def register_user(self, username: str, pw_hash: str, email: str):
        client = self.client
        db = client.SoundSnipper
        col = db.user_details
        rec = {
            "username": username,
            "pw_hash": pw_hash,
            "email": email
        }
        rec_id = col.insert_one(rec)

    def user_exists(self, username: str) -> bool:
        client = self.client
        db = client.SoundSnipper
        col = db.user_details
        if(col.count_documents({'username': username}) > 0):
            return True;
        else:
            return False;

    def get_pw(self, username: str) -> str:
        client = self.client
        db = client.SoundSnipper
        col = db.user_details
        x = col.find_one({'username':username},{'pw_hash': 1, "_id": 0})
        return x

    




if __name__ == '__main__':
    db = Database()