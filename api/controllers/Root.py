from api.utils.controllers import Controller, route

class RootController(Controller):

    @route('/')
    def index(self):
        return "Hello WOrld"
