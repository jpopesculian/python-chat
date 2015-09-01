from api.core import Model
from api.utils.time import now
from sqlalchemy import Column, Integer, String, Sequence, DateTime
from sqlalchemy.orm import relationship

class User(Model):
    __tablename__ = 'users'

    id = Column(Integer, Sequence('user_id_seq'), primary_key=True)
    name = Column(String)
    email = Column(String)
    passports = relationship('Passport', backref='user', cascade="all, delete-orphan")
    messages = relationship('Message', backref='user', cascade="all, delete-orphan")

    created_at = Column(DateTime, default=now)
    updated_at = Column(DateTime, onupdate=now)

    def __repr__(self):
        return "<User(id='%s', name='%s', email='%s')>" % (self.id, self.name, self.email)
