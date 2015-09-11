from api.core import Controller, route

class RootController(Controller):

    _RESOURCE = ''

    @route(['/', '/<path:path>'])
    def index(self, path=''):
        path = path if path in ['favicon.ico', 'robots.txt'] else 'index.html'
        return self.send_static_file(path)

    @route('/ping')
    def ping(self):
        return 'pong'
