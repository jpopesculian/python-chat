from api.core.database import Model, Base, WithId, WithTimeStamp
from api.utils.database import NormalizedString
from api.utils.strings import normalize_str
from api.utils.validators import is_email, is_username
from sqlalchemy import Column
from sqlalchemy.orm import relationship, validates

class User(Base, Model, WithId, WithTimeStamp):

    name = Column(NormalizedString, index=True, unique=True)
    email = Column(NormalizedString, index=True, unique=True)
    passports = relationship('Passport', backref='user')
    messages = relationship('Message', backref='user')

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
        return "<User(id='%s', name='%s', email='%s')>" % \
            (self.id, self.name, self.email)
