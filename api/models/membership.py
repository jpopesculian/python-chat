from api.core import Model
from api.utils.time import now
from sqlalchemy import Column, Integer, Sequence, ForeignKey, DateTime, Index

class Membership(Model):
    __tablename__ = 'memberships'

    id = Column(Integer, Sequence('membership_id_seq'), primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id', onupdate='CASCADE', ondelete='CASCADE'))
    room_id = Column(Integer, ForeignKey('rooms.id', onupdate='CASCADE', ondelete='CASCADE'))

    created_at = Column(DateTime, default=now)
    updated_at = Column(DateTime, onupdate=now, default=now)

    Index('user_id', 'room_id', unique=True)

    def __repr__(self):
        return "<Membership(id='%s', user='%s' room='%s')>" % \
            (self.id, self.user_id, self.room_id)
