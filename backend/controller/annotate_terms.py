from sklearn import preprocessing
from dotenv import load_dotenv
import numpy as np
import xgboost as xgb
import tensorflow_hub as hub
import os
import pymongo

"""Load Google Universal Sentence Encoder model"""
module_url = "https://tfhub.dev/google/universal-sentence-encoder/4"
sentence_encoder_model = hub.load(module_url)
print(f"Module loaded: {module_url}")

"""Load the encoder used in version of model to be loaded"""
label_encoder = preprocessing.LabelEncoder()
label_encoder.classes_ = np.load(r'.\controller\encoder_classes.npy')

"""Load model"""
loaded_model = xgb.Booster()
loaded_model.load_model(r'.\controller\model.bin')
print(f'Model loaded: {loaded_model}')

load_dotenv()


def mongodb_conn():
    try:
        client = pymongo.MongoClient(os.environ.get("MONGO_ATLAS"))
        print("Successfully connected to Mongo to retrieve case severity.")
        return client

    except Exception as e:
        print("Error retrieving case severities: %s" % e)

# Pull severity from corresponding case on MONGO
# Good = 1, Neutral = 2, Bad = 3

client = mongodb_conn()

caseCollection = client['myFirstDatabase']['cleaneddataswithexclusion']

caseList = []

# Get all cases and their severity
for case in caseCollection.find({}, {"case": 1, "rating": 1}):
    caseList.append(case)

def findSeverity(case):
    for obj in caseList:
        if obj["case"].strip() == case.strip():
            index = obj["rating"]
            if index == "good":
                return 1
            elif index == "neutral":
                return 2
            else:
                return 3

def embed(input):
    return sentence_encoder_model(input)


def query_model(sentence, match_threshold):

    test_embedding = embed([sentence])

    # Convert to numpy array
    test_numpy = test_embedding.numpy()

    # Create DMatrix
    dtest = xgb.DMatrix(test_numpy)

    confidence_scores_all_cases = loaded_model.predict(dtest)

    max_confidence = max(confidence_scores_all_cases[0])

    prediction_num = list(confidence_scores_all_cases[0]).index(max_confidence)

    # print(prediction_num)

    prediction_text = label_encoder.inverse_transform([int(prediction_num)])

    print(prediction_text, max_confidence)

    if max_confidence > match_threshold:
        case_obj = {'severity': findSeverity(prediction_text[0]),
                    'case_text': prediction_text[0]}

    else:
        case_obj = None

    return case_obj


def get_annotation(terms_text, match_threshold):
    sentences = terms_text.split('|')

    annotation_obj = get_cases(sentences, match_threshold)

    return annotation_obj


def debug_text_to_case_mapping(text_to_case_mapping):
    print(text_to_case_mapping)
    for mapping_obj in text_to_case_mapping:
        if mapping_obj.has_case:
            print('ToS source text: ', mapping_obj.source_text,
                  'Plain text case: ', mapping_obj.case_text)


def get_cases(sentences_list, match_threshold):
    text_to_case_mapping = []
    for sentence in sentences_list:
        case = query_model(sentence, match_threshold)
        if case:
            mapping = {
                'source_text': sentence,
                'has_case': True}
            mapping.update(case)
            text_to_case_mapping.append(mapping)
        else:
            text_to_case_mapping.append({
                'source_text': sentence,
                'has_case': False})

    print(text_to_case_mapping)

    return text_to_case_mapping


# get_cases(["Cookies", "Cookiesdfksdlfkhlses"], 0.80)64.29
