import inspect, re, os
from flask import Flask

import api.config
from api.utils.modules import find_decorators
from api.utils.misc import splash
from .controllers import Controller
from .sockets import Socket
from .database import init_db
from .logger import log

class App(Flask):

    def __init__(self, *args, **kwargs):
        controllers = kwargs.pop('controllers', None)
        env = kwargs.pop('env', None)
        if type(env) is not str:
            env = os.getenv('FLASK_ENV', 'dev')
        config = api.config.get_object(env)

        kwargs['static_url_path'] = getattr(config, 'STATIC_URL_PATH', '/static')
        kwargs['static_folder'] = getattr(config, 'STATIC_FOLDER', '../www')

        super().__init__(*args, **kwargs)

        self.config.from_object(config)
        self._init_logger()
        self._init_db()
        self.socket = self._create_socket()
        if controllers:
            self._register_all(controllers)

    def start(self, host=None, port=None, **kwargs):
        if not host: host = self.config.get('HOST', 'localhost')
        if not port: port = self.config.get('PORT', 5000)
        kwargs['use_reloader'] = self.config.get('RELOAD', False)
        if log.level_within('INFO'):
            splash('http://%s:%s' % (host, port))
        return self.socket.run(self, host, port, **kwargs)

    def _register(self, controller):
        instance = controller(app=self)
        fn_decorators = find_decorators(controller)
        route_prog = re.compile(r".*id=\'(route|socket)\'.*")
        for func, decorators in fn_decorators.items():
            route_decs = [decorator for decorator in decorators if route_prog.match(decorator)]
            if len(route_decs) > 0:
                getattr(instance, func)()
        self.register_blueprint(instance.blueprint, url_prefix=instance.url_prefix)

    def _register_all(self, module):
        controllers = [member[1] for member in inspect.getmembers(module, inspect.isclass)]
        for controller in controllers:
            if issubclass(controller, Controller):
                self._register(controller)

    def _create_socket(self):
        socket_options = {}
        prog = re.compile(r'SOCKETIO.*')
        for option, value in self.config.items():
            if prog.match(option):
                socket_option = '_'.join(option.split('_')[1:]).lower()
                socket_options[socket_option] = value
        return Socket(self, **socket_options)

    def _init_db(self):
        return init_db(self)

    def _init_logger(self):
        log.level = self.config['LOG_LEVEL']
