from api.core import Controller, route, socket
from api.core.sockets import send, emit

class RootController(Controller):

    def get_url(self):
        return ''

    @route('/')
    def index(self):
        return self.send_static_file('index.html')

    @socket('connect')
    def test(self):
        return emit('ping event', {'data': 42})

    @socket('message')
    def test2(self, message, disable=False):
        print('received')
        print(message)
        if not disable:
            return send({}, json=True)
