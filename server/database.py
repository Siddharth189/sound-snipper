from config import *
import pymongo

conn_str = f"mongodb+srv://{USER}:{PASSWORD}@{HOST}/test?retryWrites=true&w=majority"

print(conn_str)