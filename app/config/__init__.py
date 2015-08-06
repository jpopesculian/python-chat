import inspect

from . import environments
from . import auth
from . import database
from . import local
from . import logging

def get_object(env='prod'):

    def get_settings(module):
        settings = {}
        module_settings = [setting for setting in dir(module) if not setting.startswith("__")]
        for setting in module_settings:
            settings[setting] = getattr(module, setting)
        return settings

    settings = {}
    environment = environments.dev
    modules = [
        auth,
        database,
        logging,
        environment
    ] + [
        environment,
        local
    ]

    for module in modules:
        module_settings = get_settings(module)
        settings.update(module_settings)

    return settings
