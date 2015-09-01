import click
from .backend import test

@click.group()
def cli():
    pass

@cli.command(help="Start the Tests")
def run():
    test()
