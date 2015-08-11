from setuptools import setup

setup(
    name='chat-app',
    version='0.0',
    py_modules=['api'],
    author="Julian Popescu, Sudhir Sharma",
    author_email="jpopesculian@gmail.com, sudhirsharma101@gmail.com",
    install_requires=[
        "Flask",
        "Flask-SocketIO",
        "PyJWT",
        "greenlet",
        "gevent",
        "gunicorn",
        "logbook"
    ],
)
