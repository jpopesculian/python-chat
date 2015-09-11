import re

EMAIL_RE = re.compile(r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')
USERNAME_RE = re.compile(r'^[a-zA-Z0-9][a-zA-Z0-9_\-+\.]*[a-zA-Z0-9]$')
SLUG_RE = re.compile(r'^[a-zA-Z0-9][a-zA-Z0-9_\-+\.]*[a-zA-Z0-9]$')

def is_email(email):
    return bool(EMAIL_RE.match(email))

def is_username(username):
    return bool(USERNAME_RE.match(username))

def is_slug(slug):
    return bool(SLUG_RE.match(slug))
