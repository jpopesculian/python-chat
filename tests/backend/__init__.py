import requests
from .config import host

def test():
    payload = {'username': 'testuser', 'password': 'password'}
    response = requests.get('%s/api/v1/auth/local' % host)
    print(response.text)
