from flask import Flask, request, after_this_request
import json, os
import psycopg2
from configparser import ConfigParser

app = Flask(__name__)

@app.route('/', methods=['POST', 'GET'])
def index():
    @after_this_request
    def add_header(response):
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response


    return handle_level_change(bytes.decode(request.data))

def handle_code(data):
    code = json.loads(data)['code']
    code = code.replace("\'", "\"")
    result = os.popen('docker run --rm python-docker -c \'%s\'' % code).read()

    return { "result": result }

def config(filename='database.ini', section='postgresql'):
    parser = ConfigParser()
    parser.read(filename)

    db = {}
    if parser.has_section(section):
        params = parser.items(section)
        for param in params:
            db[param[0]] = param[1]
    else:
        raise Exception('Section {0} not found in the {1} file'.format(section, filename))

    return db


def handle_level_change(data):
    level = json.loads(data)['level']
    result = ""

    try:
        params = config()

        print('Connecting to the PostgreSQL database...')
        conn = psycopg2.connect(**params)
        
        cur = conn.cursor()
        
        query = 'SELECT id, template FROM levels WHERE id=\'%s\'' % level
        # look into 'prepared queries' for ^ (sql injection)
        cur.execute(query)
        # conn.commit()
        result = str(cur.fetchall())
        
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()
            print('Database connection closed.')

    return  { "result": result }
    

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')