import functools
from flask import Blueprint, json
from api.utils.strings import to_camel_case
from api.services.auth import authorize
from api.utils.codes import OK
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

    def json(self, obj, status=OK, headers=None):
        headers = dict() if not isinstance(headers, dict) else headers
        status = 500 if not isinstance(status, int) else status
        headers['Content-Type'] = 'application/json'
        return (json.dumps(obj), status, headers)

    def send_static_file(self, filename):
        return self.app.send_static_file(filename)

    def authorize(self, *args, **kwargs):
        return authorize(self, *args, **kwargs)

    def emit(self, *args, **kwargs):
        return self.socket.emit(*args, **kwargs)

    def send(self, *args, **kwargs):
        return self.socket.send(*args, **kwargs)

def route(urls, **options):
    urls = urls if isinstance(urls, list) else [urls]
    def _route(fn):
        def wrapper(self, **kwargs):

            @functools.wraps(fn)
            def new_fn(*args, **kwargs):
                response = fn(self, *args, **kwargs)
                if isinstance(response, dict) or isinstance(response, list):
                    return self.json(response)
                elif isinstance(response, tuple):
                    return self.json(*response)
                return response

            router = getattr(self, 'blueprint')
            for url in urls:
                decorate = router.route(url, **options)
                decorate(new_fn)
            return new_fn
        return wrapper
    return _route
