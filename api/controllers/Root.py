from api.core import Controller, route, socket
from api.core.sockets import emit
from api.services.auth import authorized

class RootController(Controller):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.resource = None

    @route('/')
    def index(self):
        return self.send_static_file('index.html')

    @route('/test')
    @authorized
    def show_post(self):
        return 'Hello'

    @route('/login')
    def login(self):
        return self.authorize({'user': 1})

    @socket('some event')
    def test2(self, data):
        return emit('ping event', {'data': 'hello', 'received': data })
