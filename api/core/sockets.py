import functools
from flask.ext.socketio import SocketIO
from api.utils.codes import OK
from api.utils.json import dumps

class Socket(SocketIO):

    def emit(self, event, data=None, status=OK, headers=None, **kwargs):
        headers = dict() if not isinstance(headers, dict) else headers
        status = 500 if not isinstance(status, int) else status
        headers['status'] = status
        message = {
            'headers': headers,
            'data': data,
            'status': status
        }
        return super().emit(event, dumps(message), **kwargs)

    def send(self, *args, **kwargs):
        kwargs['broadcast'] = False
        return self.emit(*args, **kwargs)

def socket(messages='message', namespace=''):
    messages = messages if isinstance(messages, list) else [messages]
    def _route(fn):
        def wrapper(self):

            @functools.wraps(fn)
            def new_fn(*args, **kwargs):
                result = fn(self, *args, **kwargs)
                if isinstance(result, tuple):
                    result = self.send(*result)
                return result

            base_namespace = getattr(self, 'get_url')()
            if base_namespace:
                full_namespace = base_namespace + '/' + namespace
            else:
                full_namespace = namespace
            for message in messages:
                decorate = self.socket.on(message, full_namespace)
                decorate(new_fn)

            return new_fn
        return wrapper
    return _route
