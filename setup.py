from setuptools import setup
import pip, threading, subprocess

def install(dependency, cache=True, upgrade=True, ignore=True, quiet=True):
    if not dependency:
        return
    command = ['pip', 'install']
    if not cache: command.append('--no-cache-dir')
    if upgrade: command.append('--upgrade')
    if ignore: command.append('--ignore-installed')
    if quiet: command.append('--quiet')
    command.append(dependency)
    print ('Installing %s' % dependency)
    return subprocess.call(command)

def install_all(dependency_groups):

    dependencies = []
    install_options = {}

    for dependency_group in dependency_groups:
        if type(dependency_group) is str:
            dependency = dependency_group
            dependencies.append(dependency)
            install(dependency, **install_options)
            continue
        threads = []
        for dependency in dependency_group:
            dependencies.append(dependency)
            thread = threading.Thread(target=install, args=(dependency,), kwargs=install_options)
            threads.append(thread)
            thread.start()
        for thread in threads:
            thread.join()

    return dependencies


dependency_groups = [
    "Flask>=0.10",
    (
        "Flask-SocketIO>=1.0a1",
        "PyJWT>=1.4.0",
        "SQLAlchemy>=1.0.8",
        "psycopg2>=2.6.1",
        "greenlet>=0.4.7",
        "gevent>=1.1b3",
        "logbook>=0.10.1",
        "click>=5.1"
    )
]

dependencies = install_all(dependency_groups)

setup(
    name='chat-app',
    version='0.0',
    py_modules=['api'],
    author="Julian Popescu, Sudhir Sharma",
    author_email="jpopesculian@gmail.com, sudhirsharma101@gmail.com",
    install_requires=dependencies,
    entry_points={
        'console_scripts':[
            'server=api:cli',
        ]
    }
)
