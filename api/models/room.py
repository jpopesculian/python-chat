from api.core.database import Model, Base, WithId, WithTimeStamp
from sqlalchemy import Column, String
from sqlalchemy.orm import relationship

class Room(Base, Model, WithId, WithTimeStamp):

    name = Column(String, index=True, unique=True)
    messages = relationship('Message', backref='room')
    users = relationship('User', secondary='memberships', backref='rooms')

    def __repr__(self):
        return "<Romm(id='%s', name='%s')>" % \
            (self.id, self.name)
