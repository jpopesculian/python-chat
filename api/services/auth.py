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

def create_token(payload, config):
    secret = config['SECRET_KEY']
    algorithm = config.get('CRYPT_ALGO', 'HS256')
    token = jwt.encode(payload, secret, algorithm=algorithm)
    return token

def header_string(token, config):
    auth_header = config.get('AUTH_HEADER', 'Authorization')
    prefix = config.get('AUTH_PREFIX', 'Bearer')
    return auth_header, prefix + ' ' + bytes_to_str(token)

def update_exp(payload, config):
    time_to_exp = config.get('TIME_TO_EXP', {'seconds': 30})
    now = datetime.datetime.utcnow()
    exp_time = now + datetime.timedelta(**time_to_exp)
    payload['iat'] = now
    payload['exp'] = exp_time
    return payload

def authorized(fn):
    @functools.wraps(fn)
    def _authorized(self, *args, **kwargs):
        config = self.app.config
        # get user from payload
        socket_data = None
        if is_socket():
            if len(args) == 2:
                socket_data = args[1]
        payload = get_jwt_payload(config, socket_data)
        if 'user' not in payload:
            if is_socket():
                return ('unauthorized', {'error': 'Not Authorized!'}, UNAUTHORIZED)
            return (jsonify({'error': 'Not Authorized!'}), UNAUTHORIZED, {})
        user = payload['user']

        # Inject into function
        print(dir(fn))
        args.append(user)
        result = fn(self, *args, **kwargs)
        # refresh token
        if result:
            payload = update_exp(payload)
            token = create_token(payload, config)
            header, token_string = header_string(token, config)
            if is_socket():
                pass
            else:
                if type(result) is tuple:
                    # @TODO: FIX THIS
                    pass
                else
                    result = (result, OK, {header: token_string})
        return result
    return _authorized

def authorize(controller, user, message='authorized', socket_data=None):
    config = controller.app.config
    # get current token payload if it exists
    payload = get_jwt_payload(config, socket_data)
    # make new token
    payload['user'] = user
    payload = update_exp(payload, config)
    token = create_token(payload, config)
    # get headers
    header, token_string = header_string(token, config)
    headers = {header: token_string}
    if is_socket():
        return ('authorized', message, OK, headers)
    return (message, OK, headers)
