from flask_restful import Resource
from flask import request

class Votes(Resource):
    def post(self):
        data = request.json
        print('UPVOTE/DOWNVOTE received!')
        print(data)