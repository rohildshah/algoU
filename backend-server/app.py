from flask import Flask, request, after_this_request, make_response, Response
import json, os
import psycopg2
from configparser import ConfigParser
import subprocess

app = Flask(__name__)

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

def _execute(query, query_parameters):
    try:
        parameters = config()

        print('Connecting to the PostgreSQL database...')
        connection = psycopg2.connect(**parameters)
        
        cursor = connection.cursor()
        
        cursor.execute(query, query_parameters)
        connection.commit()

        response = [200]
        if cursor.statusmessage.split(' ')[0] == 'SELECT':
            response.append(cursor.fetchall())
        
        cursor.close()
    except (Exception, psycopg2.DatabaseError) as error:
        response = [psycopg2.errors.lookup(error.pgcode), 500]
    finally:
        if connection is not None:
            connection.close()
            print('Database connection closed.')
    
    return response

@app.route('/execute', methods=['POST'])
def execute():
    @after_this_request
    def add_header(response):
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response

    uuid, level, code = json.loads(request.data).values()

    query = "insert into code (uuid, level, last_code) "
    query += "values (%s, %s, %s) "
    query += "on conflict (uuid, level) do "
    query += "update set last_code=excluded.last_code;"

    _execute(query, (uuid, level, code))

    f = open("tmp/%s.py" % uuid, "w")
    f.write(code)
    f.close()

    stream = subprocess.run("docker run -v $PWD/tmp/%s.py:/app/my_code.py --rm python-docker" % uuid, capture_output=True, shell=True)

    return make_response({
        'returncode': stream.returncode,
        'stdout': stream.stdout.decode('utf-8'),
        'stderr': stream.stderr.decode('utf-8'),
    }, 200)

@app.route('/levels', methods=['GET'])
def levels():
    @after_this_request
    def add_header(response):
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response
    
    query = "select * from levels where uuid=%s;"
    level = request.args.get('level')
    
    if level != None and level != "":
        response = _execute(query, (level, ))
        body = {
            'id': response[1][0][0],
            'template': response[1][0][1]
        }
        status = response[0]
        return make_response(body, status)

    return make_response("Query parameter 'level' must be specified\n", 400)

@app.route('/progress', methods=['POST', 'GET'])
def progress():
    @after_this_request
    def add_header(response):
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response
    
    if request.method == 'POST':
        query = "insert into progress (uuid, level) "
        query += "values (%s, %s) "
        query += "on conflict (uuid) do "
        query += "update set level=excluded.level;"

        uuid, level = json.loads(request.data).values()

        _execute(query, (uuid, level))
        return Response(status=201)
    else:
        query = "select * from progress where uuid=%s"
        uuid = request.args.get('uuid')

        response = _execute(query, (uuid, ))
        if (response[1] == []):
            body = {
                'level': 1
            }
        else:
            body = {
                'level': response[1][0][1]
            }
        status = response[0]
        return make_response(body, status)


@app.route('/code', methods=['POST', 'GET'])
def code():
    @after_this_request
    def add_header(response):
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response

    if request.method == 'POST':
        query = "insert into code (uuid, level, last_code) "
        query += "values (%s, %s, %s) "
        query += "on conflict (uuid, level) do "
        query += "update set last_code=excluded.last_code;"

        uuid, level, last_code = json.loads(request.data).values()

        _execute(query, (uuid, level, last_code))
        return Response(status=201)
    else:
        query = "select * from code where uuid=%s and level=%s"
        uuid, level = request.args.to_dict().values()

        response = _execute(query, (uuid, level))
        if (response[1] == []):
            query = "select * from levels where uuid=%s"
            response = _execute(query, (level, ))
            body = {
                'code': response[1][0][1]
            }
        else:
            body = {
                'code': response[1][0][2]
            }

        status = response[0]
        return make_response(body, status)
    

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')