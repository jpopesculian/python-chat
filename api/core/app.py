import inspect, re, os, json
from flask import Flask
from flask.ext.socketio import socketio as socketiolib

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
        self.init_sockets()

    def run(self):
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
        socketio.init_app(self)

        host = '127.0.0.1'
        server_name = self.config['SERVER_NAME']
        if server_name and ':' in server_name:
            port = int(server_name.rsplit(':', 1)[1])
        else:
            port = 5000

        test_mode = socketio.server_options.pop('test_mode', False)
        log_output = socketio.server_options.pop('log_output', self.debug)
        use_reloader = socketio.server_options.pop('use_reloader', self.debug)
        resource = socketio.server_options.pop('resource', 'socket.io')
        if resource.startswith('/'):
            resource = resource[1:]
        if self.debug:
            socketio.server_options['async_mode'] = 'threading'

        socketio.server = socketiolib.Server(**socketio.server_options)
        for namespace in socketio.handlers.keys():
            for message, handler in socketio.handlers[namespace].items():
                socketio.server.on(message, handler, namespace=namespace)

        self.wsgi_app = socketiolib.Middleware(socketio.server, self.wsgi_app,
                                           socketio_path=resource)
