from config import *
import pymongo

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
        x = col.find_one({'audio_id': audio_id})
        if not x: return None
        return x["audio"]
    
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
        x = col.find({'username': username},{"audio_id": 1, "audio_name": 1, "length": 1, "_id": 0})
        for rec in x:
            arr_audio.append(rec)
        return arr_audio
        

    def get_comments(self, audio_id: int) -> list[tuple[str, str, str]]:
        client = self.client
        db = client.SoundSnipper
        col = db.Audio
        x = col.find_one({'audio_id': audio_id},{"comments": 1, "_id":0})
        return x
        


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
        db = client["SoundSnipper"] 
        col = db.user_details
        return col.count_documents({'username': username}) > 0
        # TODO
        # To return: True or False

    def get_pw(self, username: str) -> str:
        client = self.client
        db = client.SoundSnipper
        col = db.user_details
        x = col.find_one({'username':username},{'pw_hash': 1, "_id": 0})
        return x

    def get_audio_privacy(self, audio_id: int) -> tuple[int, str]:
        client = self.client
        db = client.SoundSnipper
        col = db.Audio
        return col.find_one({"audio_id":audio_id},{"privacy_option":1, "username":1, "_id":0})

if __name__ == '__main__':
    db = Database()

    # print((db.get_audio(5)))

    # db.store_audio(1,123,'hritik','water',3,1)

    # db.delete_audio(5)

    # db.store_audio(1,123,'hritik','water',3,1)
    # db.store_audio(2,124,'abhinav','bubble',4,2)
    # db.store_audio(3,125,'siddharth','snooze',5,0)
    # db.store_audio(4,126,'hritik','hello',3,1)
    # print(db.get_all_saved_audios('hency'))

    # db.store_comment(1,'xyz','120','Nice')


    # db.store_comment(1,'xyl','121','Nice Bro')
    # db.store_comment(1,'xyp','122','Nice My Friend')
    # print(db.get_comments(5))

    

    # db.register_user('hritik','he123','hritik@email.com')

    # print(db.user_exists('hritikasd'))

    # print(db.get_pw('hritik123'))

    # print(db.get_audio_privacy(5))

