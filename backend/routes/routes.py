from flask_restful import Resource
from flask import request

from controller.process_html import ProcessHTML

class Routes(Resource):
    def post(self):
        data = request.json
        return ProcessHTML.init(data['html'])