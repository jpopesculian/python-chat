from . import environments
from . import session
from . import general
from . import database
from . import local
from . import logging

def get_object(env='dev'):

    class config_obj(object):
        pass

    settings = config_obj()

    environment = getattr(environments, env, environments.dev)

    modules = [
        session,
        general,
        database,
        logging,
        environment
    ] + [
        environment,
        local
    ]

    for module in modules:
        module_settings = [setting for setting in dir(module) if not setting.startswith("__")]
        for setting in module_settings:
            value = getattr(module, setting)
            setattr(settings, setting, value)

    return settings
