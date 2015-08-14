from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

Db = sessionmaker()
Model = declarative_base()

def init_db(config):
    engine = create_engine('sqlite:///:memory:', echo=True)
    Model.metadata.create_all(engine)
    Db.configure(bind=engine)
