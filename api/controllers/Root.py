from api.core import Controller, route, socket

class RootController(Controller):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.resource = None

    @route('/')
    def index(self):
        return self.send_static_file('index.html')
