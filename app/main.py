import os

from flask import Flask
from logbook import Logger

import config

log = Logger(__name__)

def load_app():
    app = Flask(__name__, static_url_path='/static', static_folder='../static')
    print(app)
    config_object = os.getenv('FLASK_ENV', 'Default')
    print(config.defined(config_object))

def main():
    load_app()

if __name__ == '__main__':
    main()
