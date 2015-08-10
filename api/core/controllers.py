from flask import Blueprint
from api.utils.strings import to_camel_case

class Controller(object):

    def __init__(self):
        self.name = to_camel_case(self.__class__.__name__)
        self.version = 'v1'
        self.resource = self.name.split('_')[0] + 's'
        self.blueprint = Blueprint(self.name, __name__)

    def send_static_file(self, filename):
        from api.main import app
        return app.send_static_file(filename)

    def get_url(self):
        return self.version + '/' + self.resource

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
