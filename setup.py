from setuptools import setup
import pip

dependencies = [
    "Flask",
    "Flask-SocketIO",
    "PyJWT",
    "SQLAlchemy",
    "psycopg2",
    "greenlet",
    "gevent",
    "gunicorn",
    "logbook",
    "click"
]

for dependency in dependencies:
    pip.main(['install', dependency])

setup(
    name='chat-app',
    version='0.0',
    py_modules=['api'],
    author="Julian Popescu, Sudhir Sharma",
    author_email="jpopesculian@gmail.com, sudhirsharma101@gmail.com",
    install_requires=dependencies,
    entry_points={
        'console_scripts':[
            'server=api:cli',
        ]
    }
)
