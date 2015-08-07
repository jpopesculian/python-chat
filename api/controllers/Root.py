from api.utils.controllers import Controller, route

class RootController(Controller):

    @route('/')
    def index(self):
        return self.send_static_file('index.html')
