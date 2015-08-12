from flask import request

def is_socket():
    return hasattr(request, 'namespace')
