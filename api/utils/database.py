from sqlalchemy import types
from .strings import normalize_str

class NormalizedString(types.TypeDecorator):
    '''
    Returns stripped and lowercase strings
    '''

    impl = types.String

    def process_bind_param(self, value, dialect):
        return normalize_str(value)

    def process_result_value(self, value, dialect):
        return normalize_str(value)

    def process_literal_param(self, value, dialect):
        return normalize_str(value)

    def python_type(self):
        return str

    def copy(self):
        return NormalizedString(self.impl.length)
