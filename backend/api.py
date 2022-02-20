from flask import Flask
from flask_restful import Resource, Api
from dotenv import load_dotenv
from flask_cors import CORS

import os
import pymongo
import requests

from routes.cases import Cases
from routes.votes import Votes

load_dotenv()

def mongodb_conn():
    try:
        client = pymongo.MongoClient(os.environ.get("MONGO_ATLAS"))

        print("Successfully connected to Mongo.")
    except Exception as e:
        print("Could not connect to server: %s" % e)

app = Flask(__name__)
cors = CORS(app)
api = Api(app)

api.add_resource(Cases, '/api')
api.add_resource(Votes, '/vote')

if __name__ == '__main__':
    mongodb_conn()
    app.run(debug=True)