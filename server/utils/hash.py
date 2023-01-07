import hashlib

def hash(str: str) -> str:
    result = hashlib.sha256(str.encode())
    return result.hexdigest()