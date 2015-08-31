from api.core import App
import api.controllers as controllers


def create_app(**kwargs):
    return App(__name__.split('.')[0], controllers=controllers, instance_relative_config=True, **kwargs)

def run(env=None, **config):
    app = create_app(env=env)
    app.config.update(**config)
    app.start()

if __name__ == '__main__':
    run()
