import functools, jwt, datetime
from flask import request, jsonify
from api.utils.codes import UNAUTHORIZED, OK
from api.utils.strings import bytes_to_str
from api.utils.handlers import is_socket

def get_jwt_payload(config, socket_data=None):
    # Get token from request
    payload = {}
    auth_header = config.get('AUTH_HEADER', 'Authorization')
    authorization = None
    if is_socket() and socket_data:
        if 'headers' in socket_data and auth_header in socket_data['headers']:
            authorization = socket_data['headers'][auth_header]
    elif auth_header in request.headers:
        authorization = request.headers[auth_header]
    if not authorization:
        return payload
    # strip prefix
    prefix = config.get('AUTH_PREFIX', 'Bearer')
    token_parts = authorization.split()
    if len(token_parts) != 2 or token_parts[0] != prefix:
        return payload
    authorization = token_parts[1]
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
        if is_socket():
            if len(args) == 2:
                socket_data = args[1]
        payload = get_jwt_payload(self.app.config, socket_data)
        if 'user' not in payload:
            if is_socket():
                return ('unauthorized', {'error': 'Not Authorized!'}, UNAUTHORIZED)
            return (jsonify({'error': 'Not Authorized!'}), UNAUTHORIZED, {})
        user = payload['user']

        # Inject into function
        kwargs['current_user'] = user
        return fn(self, *args, **kwargs)
    return _authorized

def authorize(controller, user, message='authorized', socket_data=None):
    # get current token payload if it exists
    payload = get_jwt_payload(controller.app.config, socket_data)
    # make new token
    config = controller.app.config
    auth_header = config.get('AUTH_HEADER', 'Authorization')
    prefix = config.get('AUTH_PREFIX', 'Bearer')
    secret = config['SECRET_KEY']
    algorithm = config.get('CRYPT_ALGO', 'HS256')
    time_to_exp = config.get('TIME_TO_EXP', {'seconds': 30})
    now = datetime.datetime.utcnow()
    exp_time = now + datetime.timedelta(**time_to_exp)
    payload['user'] = user
    payload['iat'] = now
    payload['exp'] = exp_time
    authorization = jwt.encode(payload, secret, algorithm=algorithm)
    headers = {auth_header: prefix + ' ' + bytes_to_str(authorization)}
    if is_socket():
        return ('authorized', message, OK, headers)
    return (message, OK, headers)
