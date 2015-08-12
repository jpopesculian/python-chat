import re

def to_camel_case(string):
    s1 = re.sub('(.)([A-Z][a-z]+)', r'\1_\2', string)
    return re.sub('([a-z0-9])([A-Z])', r'\1_\2', s1).lower()

def bytes_to_str(byte_string, encoding='utf-8'):
    return byte_string.decode(encoding)
