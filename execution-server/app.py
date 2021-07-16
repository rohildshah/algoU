from flask import Flask, request, after_this_request
import json, os

app = Flask(__name__)

@app.route('/', methods=['POST'])
def index():
    @after_this_request
    def add_header(response):
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response
    
    return handle_code(bytes.decode(request.data))

def handle_code(data):
    code = json.loads(data)['code']
    code = code.replace("\'", "\"")
    result = os.popen('docker run --rm python-docker -c \'%s\'' % code).read()

    return { "result": result }

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')