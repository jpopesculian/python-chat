import click, os
from . import main

@click.group()
def cli():
    pass

@cli.command(help="Start the Server")
@click.option('--env', '-e', default=None, help="Environment -> defaults to FLASK_ENV then to 'dev'")
@click.option('--static_url_path', '-p', default='/static', help="Root for http calls to static resources -> defaults to '/static'")
@click.option('--static_folder', '-f', default='../wwww', help="Folder from which static resources are served -> defaults to '../www'")
@click.option('--env', '-e', default=None, help="Environment -> defaults to FLASK_ENV then to 'dev'")
@click.option('--server-name', '-h', default=None, help="Host (e.g: myapp.dev:1337) -> defaults to config['SERVER_NAME']")
@click.option('--log-level', '-d', default=None, help="Forces Debug -> defaults to config['LOG_LEVEL']")
def run(env, static_url_path, static_folder, **kwargs):
    config = {}
    for option, value in kwargs.items():
        if value is not None:
            config[option.upper()] = value
    main.run(env, static_url_path, static_folder, **config)
