import functools
from flask.ext.socketio import SocketIO
from api.utils.codes import OK

class Socket(SocketIO):

    def emit(self, event, data=None, status=OK, headers=None, **kwargs):
        headers = dict() if not type(headers) is dict else headers
        status = 500 if not type(status) is int else status
        headers['status'] = status
        message = {
            'headers': headers,
            'data': data,
            'status': status
        }
        return super().emit(event, message, **kwargs)

    def send(self, *args, **kwargs):
        kwargs['broadcast'] = False
        return self.emit(*args, **kwargs)

def socket(message='message', namespace=''):
    def _route(fn):
        def wrapper(self):
            base_namespace = getattr(self, 'get_url')()
            if base_namespace:
                full_namespace = base_namespace + '/' + namespace
            else:
                full_namespace = namespace
            decorate = self.socket.on(message, full_namespace)

            @functools.wraps(fn)
            def new_fn(*args, **kwargs):
                result = fn(self, *args, **kwargs)
                if type(result) is tuple:
                    result = self.send(*result)
                return result
            decorate(new_fn)
            return new_fn
        return wrapper
    return _route
