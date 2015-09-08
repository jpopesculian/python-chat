from setuptools import setup
import threading, subprocess, re

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
    dependency_links = []
    install_options = {}

    def extract_components(dependency):
        dep_parts = dependency.split(':', 1)
        if len(dep_parts) < 2:
            return dependency, None, None
        dependency = dep_parts[0]
        git_link = dep_parts[1]
        egg_link = git_link.split('+')[1]
        egg_link = egg_link.split('.git@')[0] + '/tarball/' + egg_link.split('.git@')[1]
        dep_parts = re.split(r'(>|=)=', dep_parts[0])
        egg_link += '#egg=' + dep_parts[0]
        version = dep_parts[len(dep_parts)-1] if len(dep_parts) > 1 else ''
        if len(version) > 0:
            if version[len(version) - 1] == 'b':
                version += 'eta'
            elif version[len(version) - 1] == 'a':
                version += 'lpha'
            egg_link += '-' + version
        return dependency, git_link, egg_link


    for dependency_group in dependency_groups:
        if type(dependency_group) is str:
            dependency, git_link, egg_link = extract_components(dependency_group)
            dependencies.append(dependency)
            if git_link:
                dependency = git_link
                dependency_links.append(egg_link)
            install(dependency, **install_options)
            continue
        threads = []
        for dependency in dependency_group:
            dependency, git_link, egg_link = extract_components(dependency)
            dependencies.append(dependency)
            if git_link:
                dependency = git_link
                dependency_links.append(egg_link)
            thread = threading.Thread(target=install, args=(dependency,), kwargs=install_options)
            threads.append(thread)
            thread.start()
        for thread in threads:
            thread.join()

    return dependencies, dependency_links


dependency_groups = [
    (
        "Flask>=0.10",
        "PyJWT>=1.4.0",
        "SQLAlchemy>=1.0.8",
        "psycopg2>=2.6.1",
        "greenlet>=0.4.7",
        "gevent>=1.1b3",
        "logbook>=0.10.1",
        "click>=5.1",
        "requests>=2.7.0",
        "socketIO-client>=0.6.5",
        "bcrypt>=2.0.0"
    ),
    "Flask-SocketIO>=1.0a1"
]

dependencies, dependency_links = install_all(dependency_groups)

setup(
    name='chat-app',
    version='0.0',
    py_modules=['api'],
    author="Julian Popescu, Sudhir Sharma",
    author_email="jpopesculian@gmail.com, sudhirsharma101@gmail.com",
    install_requires=dependencies,
    dependency_links=dependency_links,
    entry_points={
        'console_scripts':[
            'server=api:cli',
            'tests=tests:cli'
        ]
    }
)
