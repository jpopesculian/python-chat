from api.core import Model
from api.utils.time import now
from api.utils.crypto import hash_pw, check_pw
from sqlalchemy import Column, Integer, String, Sequence, ForeignKey, DateTime, Index
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.dialects.postgresql import ENUM

class Passport(Model):
    __tablename__ = 'passports'

    id = Column(Integer, Sequence('passport_id_seq'), primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id', onupdate='CASCADE', ondelete='CASCADE'))
    provider = Column(ENUM('local', 'google', name='providers'))
    _key = Column('key', String)

    created_at = Column(DateTime, default=now)
    updated_at = Column(DateTime, onupdate=now, default=now)

    Index('user_id', 'provider', unique=True)

    def __repr__(self):
        return "<Passport(id='%s', provider='%s' user_id='%s')>" % \
            (self.id, self.provider, self.user_id)

    @hybrid_property
    def key(self):
        return self._key

    @key.setter
    def key(self, key):
        if self.provider == 'local':
            assert len(key) > 4
            key = hash_pw(key)
        self._key = key

    def key_matches(self, key):
        if self.provider == 'local':
            return check_pw(key, self.key)
        return self.key == key
