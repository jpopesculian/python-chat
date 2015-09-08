from api.core import Model
from api.utils.time import now
from sqlalchemy import Column, Integer, Text, Sequence, ForeignKey, DateTime, Index

class Message(Model):
    __tablename__ = 'messages'

    id = Column(Integer, Sequence('message_id_seq'), primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id', onupdate='CASCADE', ondelete='CASCADE'))
    room_id = Column(Integer, ForeignKey('rooms.id', onupdate='CASCADE', ondelete='CASCADE'))
    content = Column(Text)

    created_at = Column(DateTime, default=now)
    updated_at = Column(DateTime, onupdate=now, default=now)

    Index('user_id', 'room_id')

    def __repr__(self):
        abriged_content = self.content if len(self.content) < 15 else self.content[:10] + '...'
        return "<Message(id='%s', user='%s' room='%s', content='%s')>" % \
            (self.id, self.user_id, self.room_id, abriged_content)
