from api.utils.time import now
from api.utils.strings import to_camel_case
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy import Column, Integer, DateTime, Sequence
from sqlalchemy.ext.declarative import declarative_base, declared_attr
from .logger import log

Db = sessionmaker()

class Model:

    @declared_attr
    def __tablename__(cls):
        return to_camel_case(cls.__name__)+'s'

    @declared_attr
    def id(cls):
        sequence_name = "%s_id_seq" % cls.__tablename__
        return Column(Integer, Sequence(sequence_name), primary_key=True)

    created_at = Column(DateTime, default=now)
    updated_at = Column(DateTime, onupdate=now, default=now)

    def dict(self):
        d = {}
        for column in self.__table__.columns:
            if not column.name.startswith('_'):
                d[column.name] = getattr(self, column.name)
        return d

Base = declarative_base()

def get_connection_string(config):
    dialect = config.get('SQL_DIALECT', 'postgresql')
    driver = config.get('SQL_DRIVER', False)
    host = config.get('DB_HOST', 'localhost')
    port = config.get('DB_PORT', False)
    database = config.get('DB_DATABASE', False)
    user = config.get('DB_USER', False)
    password = config.get('DB_PASS', False)
    connection = dialect
    if driver:
        connection += "+%s" % driver
    connection += "://"
    if user:
        connection += user
        if password:
            connection += ":%s" % password
        connection += "@"
    connection += host
    if port:
        connection += ":%s" % port
    connection += "/"
    if database:
        connection += database
    return connection


def init_db(app):
    debug_SQL = log.level_within('DEBUG')
    # debug_SQL = False
    connection_string = get_connection_string(app.config)
    engine = create_engine(connection_string, echo=debug_SQL)
    Base.metadata.create_all(engine)
    Db.configure(bind=engine)
