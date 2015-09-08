from api.core import Model, Base
from sqlalchemy import Column, Integer, Text, ForeignKey, Index

class Message(Base, Model):

    user_id = Column(Integer, ForeignKey('users.id', onupdate='CASCADE', ondelete='CASCADE'))
    room_id = Column(Integer, ForeignKey('rooms.id', onupdate='CASCADE', ondelete='CASCADE'))
    content = Column(Text)

    Index('user_id', 'room_id')

    def __repr__(self):
        abriged_content = self.content if len(self.content) < 15 else self.content[:10] + '...'
        return "<Message(id='%s', user='%s' room='%s', content='%s')>" % \
            (self.id, self.user_id, self.room_id, abriged_content)
