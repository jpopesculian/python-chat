import requests
from .config import host
from .utils import start_server, close_message

def test():
    start_server()
    payload = {'channel': 'hello'}
    response = requests.post('%s/api/v1/channels' % host, json=payload)
    print(response.text)
    close_message()
