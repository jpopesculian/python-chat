import inspect, re
from flask import Blueprint
from api.utils.strings import to_camel_case
from api.utils.modules import find_decorators

class Controller(object):

    def __init__(self):
        self.name = to_camel_case(self.__class__.__name__)
        self.version = 'v1'
        self.resource = self.name.split('_')[0] + 's'
        self.blueprint = Blueprint(self.name, __name__)

    def send_static_file(self, filename):
        from api.main import app
        return app.send_static_file(filename)


def route(url, **options):
    def _route(fn):
        def wrapper(self):
            router = getattr(self, 'blueprint')
            decorate = router.route(url, **options)
            def new_fn(*args):
                return fn(self, *args)
            decorate(new_fn)
            return new_fn
        return wrapper
    return _route

def register(app, controller):
    instance = controller()
    fn_decorators = find_decorators(controller)
    route_prog = re.compile(r".*id=\'route\'.*")
    for func, decorators in fn_decorators.items():
        route_decs = [decorator for decorator in decorators if route_prog.match(decorator)]
        if len(route_decs) > 0:
            getattr(instance, func)()
    app.register_blueprint(instance.blueprint)

def register_all(app, module):
    controllers = [member[1] for member in inspect.getmembers(module, inspect.isclass)]
    for controller in controllers:
        if issubclass(controller, Controller):
            register(app, controller)
