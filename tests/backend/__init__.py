import requests
from .config import host
from .utils import start_server, close_message

def test():
    start_server()
    payload = {'email': 'test@email.com', 'username': 'test_user', 'password': 'password'}
    response = requests.post('%s/api/v1/auth/local/register' % host, json=payload)
    print(response.text)
    headers = {}
    headers['Authorization'] = response.headers['Authorization']
    response = requests.get('%s/api/v1/auth/who' % host, headers=headers)
    print(response.text)
    close_message()
