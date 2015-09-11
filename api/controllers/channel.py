from api.core import Controller, route, Db
from api.services.auth import authorized
from api.utils.validators import is_slug

class ChannelController(Controller):

    @route('', methods=['POST'])
    def create(self):
        request = self.request.json
        if 'channel' not in request:
            return {'error': 'form_incomplete'}, 500
        channel = request['channel']
        if not is_slug(channel):
            return {'error': 'invalid_input'}, 500
        db = Db()
        return 'hello'
