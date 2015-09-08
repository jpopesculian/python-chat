import requests
from .config import host

def test():
    payload = {'email': '   test@emahHHail.com', 'username': 'testuser', 'password': 'password'}
    response = requests.post('%s/api/v1/auth/local/register' % host, json=payload)
    print(response.text)
