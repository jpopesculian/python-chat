from logbook import Logger
from api.core import App
import api.controllers as controllers

log = Logger(__name__)
app = App(__name__, controllers=controllers, \
    static_url_path='/static', static_folder='../www')

if __name__ == '__main__':
    app.start()
