from api.core import Model
from api.utils.time import now
from sqlalchemy import Column, Integer, Sequence, ForeignKey, DateTime

class Membership(Model):
    __tablename__ = 'memberships'

    id = Column(Integer, Sequence('membership_id_seq'), primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    room_id = Column(Integer, ForeignKey('rooms.id'))

    created_at = Column(DateTime, default=now)
    updated_at = Column(DateTime, onupdate=now)

    def __repr__(self):
        return "<Membership(id='%s', user='%s' room='%s')>" % \
            (self.id, self.user_id, self.room_id)
