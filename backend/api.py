from flask import Flask
from flask_restful import Resource, Api
from dotenv import load_dotenv
import os
import pymongo
import requests

from routes.temp import Temp

load_dotenv()

def mongodb_conn():
    try:
        client = pymongo.MongoClient(os.environ.get("MONGO_ATLAS"))

        print("Succesfully connected to Mongo.")
    except Exception as e:
        print("Could not connect to server: %s" % e)

app = Flask(__name__)
api = Api(app)

api.add_resource(Temp, '/temp')

if __name__ == '__main__':
    mongodb_conn()
    app.run(debug=True)