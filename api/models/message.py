from api.core import Model
from api.utils.time import now
from sqlalchemy import Column, Integer, Text, Sequence, ForeignKey, DateTime

class Message(Model):
    __tablename__ = 'messages'

    id = Column(Integer, Sequence('message_id_seq'), primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    room_id = Column(Integer, ForeignKey('rooms.id'))
    content = Column(Text)

    created_at = Column(DateTime, default=now)
    updated_at = Column(DateTime, onupdate=now)

    def __repr__(self):
        abriged_content = self.content if len(self.content) < 15 else self.content[:10] + '...'
        return "<Message(id='%s', user='%s' room='%s', content='%s')>" % \
            (self.id, self.user_id, self.room_id, abriged_content)
