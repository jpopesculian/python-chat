import os
from flask import Flask
from logbook import Logger

import api.config
from api.utils.controllers import register_all

import api.controllers as controllers

def load_app():
    flask_app = Flask(__name__, static_url_path='/static', static_folder='../static')

    env = os.getenv('FLASK_ENV', 'dev')
    config = api.config.get_object(env)
    flask_app.config.from_object(config)

    return flask_app

log = Logger(__name__)
app = load_app()

def main():
    register_all(app, controllers)
    app.run()

if __name__ == '__main__':
    main()
