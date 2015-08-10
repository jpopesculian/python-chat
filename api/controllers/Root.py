from api.core import Controller, route

class RootController(Controller):

    @route('/')
    def index(self):
        return self.send_static_file('index.html')

    def get_url(self):
        return ''
