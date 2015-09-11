from api.core import Controller, route, Db
from api.models import Room
from api.services.auth import authorized
from api.utils.validators import is_slug

class RoomController(Controller):

    @route('', methods=['POST'])
    def create(self):
        request = self.request.json
        if 'room' not in request:
            return {'error': 'form_incomplete'}, 500
        name = request['room']
        if not is_slug(name):
            return {'error': 'invalid_input'}, 500
        db = Db()
        room = db.query(Room).filter_by(name=name).first()
        print(room)
        if room:
            return {'error': 'room_exists'}, 500
        room = Room(name=name)
        db.add(room)
        db.commit()
        result = room.dict()
        self.emit('new room', result)
        return result

    @route('', methods=['GET'])
    def list(self):
        db = Db()
        rooms = db.query(Room)
        return [room.dict() for room in rooms]
