import functools
from flask.ext.socketio import SocketIO, emit

socketio = SocketIO()

def socket(message='message', namespace=''):
    def _route(fn):
        def wrapper(self):
            base_namespace = getattr(self, 'get_url')()
            if base_namespace:
                full_namespace = base_namespace + '/' + namespace
            else:
                full_namespace = namespace
            decorate = socketio.on(message, full_namespace)

            @functools.wraps(fn)
            def new_fn(*args, **kwargs):
                return fn(self, *args, **kwargs)
            decorate(new_fn)
            return new_fn
        return wrapper
    return _route
