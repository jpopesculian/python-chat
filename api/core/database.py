from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from .logger import log

Db = sessionmaker()
Model = declarative_base()

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
    connection_string = get_connection_string(app.config)
    engine = create_engine(connection_string, echo=log.level_within('DEBUG'))
    Model.metadata.create_all(engine)
    Db.configure(bind=engine)
