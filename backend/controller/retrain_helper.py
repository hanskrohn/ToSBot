from dotenv import load_dotenv
import os
import pymongo

load_dotenv()

def mongodb_conn():
    try:
        client = pymongo.MongoClient(os.environ.get("MONGO_ATLAS"))
        print("Successfully connected to Mongo to power retraining helper functions.")
        return client

    except Exception as e:
        print("Error connecting to Mongo: %s" % e)

client = mongodb_conn()

caseCollection = client['myFirstDatabase']['cleaneddataswithexclusion']

totalVoteDatas = client['myFirstDatabase']['totalvotedatas']

# Votes on a case-snippet pair must meet or exceed threshold to be added
voteThreshold = 5

# this function should be called first
def generateBackup():
  backup = client['myFirstDatabase']['temptrainingbackup']
  # wipe previous backup if it exists
  backup.drop()
  # rewrite current training set to backup
  for obj in caseCollection.find({}):
    backup.insert_one(obj)

# this function is called to migrate upvoted snippets into the main training collection
def updateTrainingSet():
  upvotedCases = []
  for obj in totalVoteDatas.find({}):
    upvotedCases.append(obj)
  for case in upvotedCases:
    for snippet in case["snippets"]:
      if snippet["numUpvotes"] >= voteThreshold:
         # if a snippet-case pairing has received more than threshold, add it to the trainig set
         newSnippet = {
           "quoteText": snippet["source_text"],
           "companyName": snippet["firstURL"],
           "charLength": len(snippet["source_text"])
         }
         caseCollection.update_one({"case": case["case"]}, {"$push": {"snippets": newSnippet}})

# this function is called after updateTrainingSet to wipe vote data if accuracy went UP
def resetVoteData():
  client['myFirstDatabase']['votedatas'].drop()

# this function is called after updateTrainingSet to wipe vote data and RESET training set if accuracy went DOWN
def hardResetVoteData():
  totalVoteDatas.drop()
  client['myFirstDatabase']['votedatas'].drop()
  
  # reset training set
  caseCollection.drop()
  backup = client['myFirstDatabase']['temptrainingbackup']
  for obj in backup.find({}):
    caseCollection.insert_one(obj)
  backup.drop()
