from api.core import Controller, route, socket
from api.core.sockets import emit

class RootController(Controller):

    def __init__(self, *args):
        super().__init__(*args)
        self.resource = None

    @route('/')
    def index(self):
        return self.send_static_file('index.html')

    @route('/post/<int:post_id>')
    def show_post(self, post_id):
        # show the post with the given id, the id is an integer
        return 'Post %d' % post_id

    @socket('some event')
    def test2(self, data):
        return emit('ping event', {'data': 'hello', 'received': data }, broadcast=True)
