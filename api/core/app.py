import inspect, re, os
from flask import Flask

import api.config
from api.utils.modules import find_decorators
from .controllers import Controller
from .sockets import socketio

class App(Flask):

    def __init__(self, *args, **kwargs):
        controllers = kwargs.pop('controllers', None)
        super().__init__(*args, **kwargs)
        env = os.getenv('FLASK_ENV', 'dev')
        config = api.config.get_object(env)
        self.config.from_object(config)
        if controllers:
            self.register_all(controllers)
        socketio.init_app(self)

    def run(self):
        socketio.run(self)

    def register(self, controller):
        instance = controller()
        fn_decorators = find_decorators(controller)
        route_prog = re.compile(r".*id=\'route\'.*")
        for func, decorators in fn_decorators.items():
            route_decs = [decorator for decorator in decorators if route_prog.match(decorator)]
            if len(route_decs) > 0:
                getattr(instance, func)()
        self.register_blueprint(instance.blueprint, url_prefix=instance.get_url())

    def register_all(self, module):
        controllers = [member[1] for member in inspect.getmembers(module, inspect.isclass)]
        for controller in controllers:
            if issubclass(controller, Controller):
                self.register(controller)
