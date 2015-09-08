from api.core import Model
from api.utils.time import now
from api.utils.database import NormalizedString
from api.utils.strings import normalize_str
from api.utils.validators import is_email, is_username
from sqlalchemy import Column, Integer, Sequence, DateTime
from sqlalchemy.orm import relationship, validates

class User(Model):
    __tablename__ = 'users'

    id = Column(Integer, Sequence('user_id_seq'), primary_key=True)
    name = Column(NormalizedString, index=True, unique=True)
    email = Column(NormalizedString, index=True, unique=True)
    passports = relationship('Passport', backref='user')
    messages = relationship('Message', backref='user')

    created_at = Column(DateTime, default=now)
    updated_at = Column(DateTime, onupdate=now, default=now)

    @validates('name')
    def validates_name(self, key, name):
        name = normalize_str(name)
        assert len(name) > 1
        assert len(name) < 65
        assert is_username(name)
        return name

    @validates('email')
    def validates_email(self, key, email):
        email = normalize_str(email)
        assert is_email(email)
        return email

    def __repr__(self):
        return "<User(id='%s', name='%s', email='%s')>" % (self.id, self.name, self.email)
