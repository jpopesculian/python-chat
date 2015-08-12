from api.core import Controller, route, socket
from api.core.sockets import emit
from api.services.auth import authorized
from flask import request

class RootController(Controller):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.resource = None

    @route('/')
    def index(self):
        return self.send_static_file('index.html')

    @route('/test')
    def show_post(self):
        return 'Hello'

    @route('/login')
    def login(self):
        return self.authorize({'id': 1})

    @socket('some event')
    def test2(self, data):
        return self.authorize({'id': 1})
