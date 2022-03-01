from flask_restful import Resource
from flask import request
from dotenv import load_dotenv
import time

import os
import pymongo

load_dotenv()


def mongodb_conn():
    try:
        client = pymongo.MongoClient(os.environ.get("MONGO_ATLAS"))
        print("Successfully connected to Mongo.")
        return client

    except Exception as e:
        print("Could not connect to server: %s" % e)


client = mongodb_conn()

voteCollection = client['myFirstDatabase']['votedatas']

totalCollection = client['myFirstDatabase']['totalvotedatas']


class Votes(Resource):
    def post(self):
        data = request.json

        # notes: throttling is computationally expensive using only MongoDB
        # a better solution would be using an in-memory distributed cache
        # like Memcached
        print(type(data))
        print(data)

        # 1. UUID throttling
        # query all votes from uuid
        # if number of votes exceeds 50 in last day, cancel process
        currentTime = int(time.time())*1000
        numVotesInWindow = voteCollection.count_documents(
            {"uuid": data["uuid"], "timestamp": {"$gt": currentTime - 86400000}})
        if numVotesInWindow > 50:
            return

        # 2. IP throttling
        # query all votes from IP
        # if number of votes from IP exceeds 1000 in last day, cancel process
        numVotesInIPWindow = voteCollection.count_documents(
            {"clientIP": data["clientIP"], "timestamp": {"$gt": currentTime - 86400000}})
        if numVotesInIPWindow > 1000:
            return

        # 3. insert vote into raw data table
        voteCollection.insert_one(data)

        # 4. insert vote into aggregate table

        # Helper function
        def increment_vote():
            # snippet also exists, increment vote count
            if data['voteType'] == 'upvote':
                totalCollection.update_one(
                    {"case": data["case_text"], "snippets.source_text": data['source_text']}, {"$inc": {"snippets.$.numUpvotes": 1}})
            else:
                totalCollection.update_one(
                    {"case": data["case_text"], "snippets.source_text": data['source_text']}, {"$inc": {"snippets.$.numDownvotes": 1}})

        # first check if the case already exists
        doc = totalCollection.find_one({"case": data["case_text"]})
        if doc is None:
            # write new document
            newCase = {"case": data["case_text"], "snippets": []}
            totalCollection.insert_one(newCase)
        # case exists, check if snippet exists
        doc = totalCollection.find_one({"case": data["case_text"]})
        if any(snippet['source_text'] == data['source_text'] for snippet in doc['snippets']):
            # snippet also exists, increment vote count
            increment_vote()
        else:
            # snippet does not exist, add snippet to array and then increment vote count
            newSnippet = {
                "source_text": data['source_text'],
                "numUpvotes": 0,
                "numDownVotes": 0,
                "firstURL": data["url"],
                "firstTimestamp": data["timestamp"]
            }
            totalCollection.update_one({"case": data["case_text"]}, {
                                        "$push": {"snippets": newSnippet}})
            increment_vote()
