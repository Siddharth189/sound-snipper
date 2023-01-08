from config import *
import pymongo

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
        db = client["SoundSnipper"] 
        col = db["Audio"]
        x = col.find({},{'audio_id': audio_id})
        return x["binary"]
    
    def store_audio(self, audio_id: int, audio, username: str, audio_name: str, audio_length: int, privacy_option: int):
        client = self.client
        db = client.database
        col = db.my_collection
        comment = []
        rec = {
            "audio_id": audio_id,
            "audio": audio,
            "username": username,
            "audio_name": audio_name,
            "audio_length": audio_length,
            "privacy_option": privacy_option, 
            "comment":comment
        }
        rec_id = col.insert_one(rec)
        

    def delete_audio(self, audio_id: int):
        client = self.client
        db = client.database
        col = db.my_collection
        result = col.delete_one({"audio_id": audio_id})


    def get_all_saved_audios(self, username: str) -> list[tuple[int, str, int]]:
        client = self.client
        db = client.database
        col = db.my_collection
        audios = []
        for audio in col.find({'username': username}):
            audios.append((audio['audio_id'], audio['audio_name'], audio['audio_length']))
        return audios
        # TODO
        # To return: Array of (audio_id, audio_name, length)

    def get_comments(self, audio_id: int) -> list[tuple[str, str, str]]:
        client = self.client
        db = client.database
        col = db.my_collection
        x = col.find({'audio_id': audio_id})
        arr = [x.comment, x.username, x.timestamp]
        
        # TODO
        # To return: Array of (comment, username, timestamp)


    def store_comment(self, audio_id: int, username: str, timestamp: str, comment: str):
        # comment - list of dictionaries
        # id - autogenerate
        # timestamp
        # comment
        
        client = self.client
        db = client.database
        col = db.my_collection
        comment_dict = {
                        'timestamp' : timestamp, 
                        'comment' : comment, 
                        'username' : username}

        
        rec_id = col.updateOne(
        { 'audio_id' : audio_id },
        { '$push': { 'comment': comment_dict } }
        )
        # TODO

    def register_user(self, username: str, pw_hash: str, email: str):
        client = self.client
        # TODO

    def user_exists(self, username: str) -> bool:
        client = self.client
        db = client["SoundSnipper"] 
        col = db["Audio"]
        return col.count_documents({'username': username}) > 0
        # TODO
        # To return: True or False

    def get_pw(self, username: str) -> str:
        client = self.client
        
        # TODO
        # To return: password hash of user


    def get_audio_privacy(self, audio_id: int) -> tuple[int, str]:
        client = self.client
        # TODO
        # To return: (privacy_int and username) of the audio

if __name__ == '__main__':
    db = Database()