import bcrypt
from .strings import str_to_bytes, bytes_to_str

def hash_pw(key):
    key = str_to_bytes(key)
    hashed = bcrypt.hashpw(key, bcrypt.gensalt())
    return bytes_to_str(hashed)

def check_pw(key, hashed):
    key = str_to_bytes(key)
    hashed = str_to_bytes(hashed)
    return bcrypt.hashpw(key, hashed) == hashed
