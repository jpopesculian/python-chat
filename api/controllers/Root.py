from api.core import Controller, route

class RootController(Controller):

    _RESOURCE = ''

    @route('/')
    def index(self):
        return self.send_static_file('index.html')

    @route('/ping')
    def ping(self):
        return 'pong'
