from flask_restful import Resource
from flask import request

from controller.process_html import ProcessHTML

class Routes(Resource):
    def post(self):
        data = request.json
        # print(data)
        return ProcessHTML.init(data['html'])