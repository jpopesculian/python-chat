from api.core import Model, Base
from sqlalchemy import Column, Integer, ForeignKey, Index

class Membership(Model, Base):

    user_id = Column(Integer, ForeignKey('users.id', onupdate='CASCADE', ondelete='CASCADE'))
    room_id = Column(Integer, ForeignKey('rooms.id', onupdate='CASCADE', ondelete='CASCADE'))

    Index('user_id', 'room_id', unique=True)

    def __repr__(self):
        return "<Membership(id='%s', user='%s' room='%s')>" % \
            (self.id, self.user_id, self.room_id)
