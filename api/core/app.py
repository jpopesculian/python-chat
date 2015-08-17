import inspect, re, os, json
from flask import Flask

import api.config
from api.utils.modules import find_decorators
from .controllers import Controller
from .sockets import socketio
from .database import init_db

class App(Flask):

    def __init__(self, *args, **kwargs):
        controllers = kwargs.pop('controllers', None)
        super().__init__(*args, **kwargs)
        env = os.getenv('FLASK_ENV', 'dev')
        config = api.config.get_object(env)
        self.config.from_object(config)
        self.init_db()
        if controllers:
            self.register_all(controllers)
        self.init_sockets()

    def start(self):
        socketio.run(self)

    def register(self, controller):
        instance = controller(app=self)
        fn_decorators = find_decorators(controller)
        route_prog = re.compile(r".*id=\'(route|socket)\'.*")
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

    def init_sockets(self):
        socket_options = {}
        prog = re.compile(r'SOCKETIO.*')
        for option, value in self.config.items():
            if prog.match(option):
                socket_option = '_'.join(option.split('_')[1:]).lower()
                socket_options[socket_option] = value
        socketio.init_app(self, **socket_options)

    def init_db(self):
        return init_db(self)
