import click
from . import main

@click.group()
def cli():
    pass

@cli.command(help="Start the Server")
@click.option('--env', '-e', default=None, help="Environment -> defaults to FLASK_ENV then to 'dev'")
@click.option('--host', '-h', default=None, help="Host Name -> defaults to config['HOST'] then to localhost")
@click.option('--port', '-p', default=None, help="Port Number -> defaults to config['PORT'] then to 5000")
@click.option('--log-level', '-l', default=None, help="Log Level -> defaults to config['LOG_LEVEL'] then to 'WARN'")
@click.option('--debug', '-d', is_flag=True, help="Debug Flask -> defaults to config['DEBUG'] then to False")
@click.option('--reload', '-r', is_flag=True, help="Reloads on Code Change -> defaults to config['RELOAD'] then to False")
def run(env, **kwargs):
    config = {}
    for option, value in kwargs.items():
        if value is not None:
            config['_'.join(option.upper().split('-'))] = value
    print(config)
    main.run(env, **config)
