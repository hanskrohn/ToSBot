from flask import Flask
from flask_restful import Resource, Api
from flask_cors import CORS

from routes.cases import Cases
from routes.votes import Votes
from routes.retrain import Retrain

app = Flask(__name__)
cors = CORS(app)
api = Api(app)

api.add_resource(Cases, '/api')
api.add_resource(Votes, '/vote')
api.add_resource(Retrain, '/retrain')

if __name__ == '__main__':
    app.run(debug=True)
