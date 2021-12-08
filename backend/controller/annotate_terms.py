import random
from sklearn import preprocessing 
import numpy as np
import xgboost as xgb
import tensorflow_hub as hub
import os

numbers = [1,2,3]

"""Load Google Universal Sentence Encoder model"""

module_url = "https://tfhub.dev/google/universal-sentence-encoder/4" 
sentence_encoder_model = hub.load(module_url)
print (f"Module loaded: {module_url}")

"""Load the encoder used in version of model to be loaded"""
label_encoder = preprocessing.LabelEncoder()
label_encoder.classes_ = np.load(r'.\controller\encoder_classes.npy') 

# load serialized model from file
model_datetime = "('20210818155130', {'max_depth': 7, 'n_estimators': 1000, 'eta': 1, 'verbosity': 3, 'objective': 'multi:softmax', 'num_class': 38})"

loaded_model = xgb.Booster()
loaded_model.load_model(r'.\controller\model.bin')

print(f'Model loaded: {loaded_model}')


def embed(input):
  return sentence_encoder_model(input)

def query_model(sentence, match_threshold):
    # Some ML magic
    randomSeverity = random.choice(numbers)

    test_embedding = embed([sentence])

    # Convert to numpy array
    test_numpy = test_embedding.numpy()

    #Create DMatrix
    dtest = xgb.DMatrix(test_numpy)

    prediction_num = loaded_model.predict(dtest)

    # print(prediction_num)

    prediction_text  = label_encoder.inverse_transform([int(prediction_num)])

    # print(prediction_text)

    case_obj = {'severity': randomSeverity, 'case_text': prediction_text[0], 'match_confidence':0.6}

    # print(case_obj)
    
    return case_obj # includes generalized case, severity, match %, any other information

def get_annotation(terms_text, match_threshold):
    sentences = terms_text.split('.')

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

    return text_to_case_mapping
