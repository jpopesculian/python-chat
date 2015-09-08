import psycopg2, multiprocessing, subprocess, sys, time, requests
from .config import host

def db_connect():
    conn_string = "host='localhost' dbname='test' user='julian' password='password'"
    connection = psycopg2.connect(conn_string)
    connection.set_isolation_level(0)
    return connection

def clean_db_tables(connection):
    connection = db_connect()
    cursor = connection.cursor()
    command = """SELECT table_schema,table_name
        FROM information_schema.tables
        WHERE table_schema = 'public'
        ORDER BY table_schema,table_name"""
    cursor.execute(command)
    rows = cursor.fetchall()
    for row in rows:
        print("dropping table: ", row[1])
        cursor.execute("drop table " + row[1] + " cascade")
    cursor.close()
    connection.close()

def clean_db_schema():
    connection = db_connect()
    cursor = connection.cursor()
    command = """DROP schema public cascade;
        CREATE schema public;"""
    cursor.execute(command)
    cursor.close()
    connection.close()

def clean_db():
    # clean_db_tables()
    clean_db_schema()

def close_message():
    print("\n *** Press Ctrl^C to Exit ***\n")

def _start_server():
    command = ['server', 'run', '-d']
    return subprocess.Popen(command).communicate()

def server_up():
    try:
        response = requests.get('%s/ping' % host)
    except requests.exceptions.ConnectionError:
        return False
    return response.status_code == 200

def start_server():
    clean_db()
    multiprocessing.Process(target=_start_server).start()
    while not server_up():
        time.sleep(0.2)
    print("\n ====================\n || SERVER STARTED ||\n ====================\n")
