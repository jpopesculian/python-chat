import requests
from .config import host
from .utils import start_server, close_message

def test():
    start_server()
    payload = {'email': 'test@email.com', 'username': 'test_user', 'password': 'password'}
    response = requests.post('%s/api/v1/auth/local/register' % host, json=payload)
    close_message()
