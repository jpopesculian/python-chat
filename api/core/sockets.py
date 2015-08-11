import functools
from flask.ext.socketio import SocketIO
from api.utils.codes import OK

socketio = SocketIO()

def emit(event, data=None, status=OK, headers={}, *args, **kwargs):
    message = {
        'headers': headers,
        'data': data,
        'status': status
    }
    return socketio.emit(event, message, *args, **kwargs)

def send(*args, **kwargs):
    kwargs['broadcast'] = False
    return emit(*args, **kwargs)

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
                kwargs['_is_socket'] = True
                result = fn(self, *args, **kwargs)
                if type(result) is tuple:
                    result = send(*result)
                return result
            decorate(new_fn)
            return new_fn
        return wrapper
    return _route
