import functools, jwt, datetime
from flask import request, jsonify
from api.utils.codes import UNAUTHORIZED, OK

def get_payload(app, socket_data=None):
    config = app.config
    # Get token from request
    payload = {}
    auth_header = config.get('AUTH_HEADER', 'Authorization')
    authorization = None
    if socket_data:
        if 'headers' in socket_data and auth_header in socket_data['headers']:
            authorization = socket_data['headers'][auth_header]
    elif auth_header in request.headers:
        authorization = request.headers[auth_header]
    if not authorization:
        return payload
    # get payload from token
    secret = config['SECRET_KEY']
    algorithm = config.get('CRYPT_ALGO', 'HS256')
    try:
        payload = jwt.decode(authorization, secret, algorithm=algorithm)
    except jwt.InvalidTokenError:
        payload = {}
    return payload

def authorized(fn):
    @functools.wraps(fn)
    def _authorized(self, *args, **kwargs):
        # get user from payload
        socket_data = None
        is_socket = '_is_socket' in kwargs
        if is_socket:
            if len(args) > 1:
                socket_data = args[1]
        payload = get_payload(self.app, socket_data)
        if 'user' not in payload:
            if is_socket:
                return ('unauthorized', {'error': 'Not Authorized!'}, UNAUTHORIZED)
            return (jsonify({'error': 'Not Authorized!'}), UNAUTHORIZED, {})
        user = payload['user']

        # Inject into function
        kwargs['current_user'] = user
        return fn(self, *args, **kwargs)
    return _authorized

def authorize(controller, user, message='authorized', socket_data=None, is_socket=False):
    # get current token payload if it exists
    payload = get_payload(controller.app, socket_data)
    # make new token
    config = controller.app.config
    auth_header = config.get('AUTH_HEADER', 'Authorization')
    secret = config['SECRET_KEY']
    algorithm = config.get('CRYPT_ALGO', 'HS256')
    time_to_exp = config.get('TIME_TO_EXP', {'seconds': 30})
    now = datetime.datetime.utcnow()
    exp_time = now + datetime.timedelta(**time_to_exp)
    payload['user'] = user
    payload['iat'] = now
    payload['exp'] = exp_time
    authorization = jwt.encode(payload, secret, algorithm=algorithm)
    headers = {auth_header: authorization}
    if socket_data or is_socket:
        return ('authorized', message, OK, headers)
    return (message, OK, headers)
