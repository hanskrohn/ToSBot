# this script is same as datacleaner.py but will eliminate (not write) snippets that are:
# - NOT English
# - have quote lengths < 20 characters
# - have quote lengths > 1000 characters

import pymongo
import os
from dotenv import load_dotenv
import re
from polyglot.text import Text

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

# function for cleaning HTML tags (including things like &nbsp)
# from https://stackoverflow.com/questions/9662346/python-code-to-remove-html-tags-from-a-string
def cleanHTML(string):
  # first replace &nbsp with a single space since this is a common occurence
  string = re.sub('&nbsp;', ' ', string, flags=re.IGNORECASE)
  # then remove all other instances of HTML tags and HTML ampersands.=
  cleanr = re.compile('<.*?>|&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-f]{1,6});')
  cleanText = re.sub(cleanr, '', string)
  return cleanText

# function for fixing incorrect spacing between periods and double spacing (for example: "Hello.My    name is Jeff.Nice to meet you.")
# from https://stackoverflow.com/questions/29506718/having-trouble-adding-a-space-after-a-period-in-a-python-string/29507362
def cleanSpacing(string):
  return re.sub(r'\.(?! )', '. ', re.sub(r' +', ' ', string))

# function for detecting a language a string is written in (uses polyglot, you may run into errors. need to install: see below)
# https://stackoverflow.com/questions/37512311/cant-install-python-polyglot-package-on-windows/48056309
def detectLanguage(string):
  text = Text(string)
  d = dict()
  d['langCode'] = text.language.code
  d['langName'] = text.language.name
  return d

# vars for understanding data
numSnippets = 0
numNotEnglish = 0
totalChars = 0
minCharLength = 10000000000
maxCharLength = 0

# now we can iterate through all snippets of each case and run these functions - adding a language field for each
for case in caseList:
  for snippet in case['snippets']:
    dirtyString = snippet['quoteText']
    dirtyString = cleanHTML(dirtyString)
    cleanString = cleanSpacing(dirtyString)

    # write and check length of cleaned string
    snippet['charLength'] = len(cleanString)
    if snippet['charLength'] < 20 or snippet['charLength'] > 1000:
      case['snippets'].remove(snippet)
      continue

    # write and check language of cleaned string
    snippet['language'] = detectLanguage(cleanString)['langName']
    if snippet['language'] != 'English':
      case['snippets'].remove(snippet)
      continue

    # replace the value with the cleaned string
    snippet['quoteText'] = cleanString
    snippet['language'] = detectLanguage(cleanString)['langName']

    # for understanding data
    totalChars += len(cleanString)
    numSnippets += 1
    if len(cleanString) < minCharLength:
      minCharLength = len(cleanString)
    if len(cleanString) > maxCharLength:
      maxCharLength = len(cleanString)
    if snippet['language'] != 'English':
      numNotEnglish +=1

      
print("numSnippets: " + str(numSnippets))
print("numNotEnglish: " + str(numNotEnglish))
print("averageCharLength: " + str(totalChars / numSnippets)) 
print("minCharLength: " + str(minCharLength)) 
print("maxCharLenght: " + str(maxCharLength)) 

# write caseList to new mongoDB collection
db['cleaneddataswithexclusions'].insert_many(caseList)