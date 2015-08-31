from api.core import Model
from api.utils.time import now
from sqlalchemy import Column, Integer, String, Sequence, ForeignKey, DateTime
from sqlalchemy.dialects.postgresql import ENUM

class Passport(Model):
    __tablename__ = 'passports'

    id = Column(Integer, Sequence('passport_id_seq'), primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    provider = Column(ENUM('local', name='providers'))
    key = Column(String)

    created_at = Column(DateTime, default=now)
    updated_at = Column(DateTime, onupdate=now)

    def __repr__(self):
        return "<Passport(id='%s', provider='%s' user_id='%s')>" % \
            (self.id, self.provider, self.user_id)
