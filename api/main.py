from api.core import App, log
import api.controllers as controllers
from api.utils.misc import splash


def create_app(**kwargs):
    return App(__name__, controllers=controllers, **kwargs)

def run(env=None, static_url_path='/static', static_folder='../www', **config):
    app = create_app(env=env, static_url_path=static_url_path, static_folder=static_folder)
    app.config.update(**config)
    app.start()

if __name__ == '__main__':
    run()
