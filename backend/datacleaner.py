import pymongo
import os
from dotenv import load_dotenv
import re

load_dotenv()

def mongodb_conn():
    try:
        client = pymongo.MongoClient(os.environ.get("MONGO_ATLAS"))
        print("Successfully connected to Mongo.")
        return client

    except Exception as e:
        print("Could not connect to server: %s" % e)

client = mongodb_conn()
db = client['myFirstDatabase']
parsedData = db['parseddatas']

caseList = []

# Get all cases
for case in parsedData.find({}):
  caseList.append(case)

# function for cleaning HTML tags (including things like &nsbm)
# from https://stackoverflow.com/questions/9662346/python-code-to-remove-html-tags-from-a-string
def cleanHTML(string):
  cleanr = re.compile('<.*?>|&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-f]{1,6});')
  cleanText = re.sub(cleanr, '', string)
  return cleanText

# function for fixing incorrect spacing between periods and double spacing (for example: "Hello.My    name is Jeff.Nice to meet you.")
def cleanSpacing(string):
  return re.sub(r'\.(?! )', '. ', re.sub(r' +', ' ', string))




