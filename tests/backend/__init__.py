import requests
from .config import host
from .utils import start_server, close_message

def test():
    start_server()
    response = requests.post('%s/api/v1/rooms' % host, json={'room': 'hello'})
    response = requests.post('%s/api/v1/rooms' % host, json={'room': 'what'})
    response = requests.post('%s/api/v1/rooms' % host, json={'room': 'cool'})
    response = requests.post('%s/api/v1/rooms' % host, json={'room': 'hi'})
    response = requests.post('%s/api/v1/rooms' % host, json={'room': 'no'})
    response = requests.post('%s/api/v1/rooms' % host, json={'room': 'whatsup'})
    response = requests.get('%s/api/v1/rooms' % host)
    print(response.text)
    close_message()
