from flask_restful import Resource
from flask import request

from controller.update_model import driver

class Retrain(Resource):
  def post(self):
    data = request.json
    return driver(data)