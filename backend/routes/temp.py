from flask_restful import Resource
from controller.temp import TempClass

class Temp(Resource):
    def get(self):
        return TempClass.HelloWorld()