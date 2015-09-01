import functools
from flask import Blueprint
from api.utils.strings import to_camel_case
from api.services.auth import authorize
from flask import request

class Controller(object):

    _VERSION = 1

    def __init__(self, app):
        self.app = app
        self.blueprint = Blueprint(self.name, __name__)

    @property
    def name(self):
        return getattr(self, '_NAME', to_camel_case(self.__class__.__name__))

    @property
    def version(self):
        return 'v%d' % self._VERSION

    @property
    def resource(self):
        return getattr(self, '_RESOURCE', self.name.split('_')[0] + 's')

    @property
    def socket(self):
        return self.app.socket

    @property
    def request(self):
        return request

    @property
    def config(self):
        return self.app.config

    @property
    def url_prefix(self):
        if self.version and self.resource:
            return '/api/' + self.version + '/' + self.resource
        return ''

    def send_static_file(self, filename):
        return self.app.send_static_file(filename)

    def authorize(self, *args, **kwargs):
        return authorize(self, *args, **kwargs)

    def emit(self, *args, **kwargs):
        return self.socket.emit(*args, **kwargs)

    def send(self, *args, **kwargs):
        return self.socket.send(*args, **kwargs)

def route(url, **options):
    def _route(fn):
        def wrapper(self):
            router = getattr(self, 'blueprint')
            decorate = router.route(url, **options)

            @functools.wraps(fn)
            def new_fn(*args, **kwargs):
                return fn(self, *args, **kwargs)
            decorate(new_fn)
            return new_fn
        return wrapper
    return _route
