from api.core import Controller, route, socket

class RootController(Controller):

    _RESOURCE = ''

    @route('/')
    def index(self):
        return self.send_static_file('index.html')
