from api.core import Model
from api.utils.time import now
from sqlalchemy import Column, Integer, String, Sequence, DateTime
from sqlalchemy.orm import relationship

class Room(Model):
    __tablename__ = 'rooms'

    id = Column(Integer, Sequence('room_id_seq'), primary_key=True)
    name = Column(String)
    messages = relationship('Message', backref='room', cascade="all, delete-orphan")
    users = relationship('User', secondary='memberships', backref='rooms')

    created_at = Column(DateTime, default=now)
    updated_at = Column(DateTime, onupdate=now)

    def __repr__(self):
        return "<Romm(id='%s', name='%s')>" % (self.id, self.name)
