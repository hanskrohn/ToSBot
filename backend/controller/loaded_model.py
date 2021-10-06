import pickle
from sklearn import preprocessing 
import numpy as np
import xgboost as xgb
import tensorflow_hub as hub



"""Load Google Universal Sentence Encoder model"""

module_url = "https://tfhub.dev/google/universal-sentence-encoder/4"
sentence_encoder_model = hub.load(module_url)
print (f"module {module_url} loaded")

"""Define helper functions"""

def embed(input):
  return sentence_encoder_model(input)


"""Load the encoder used in version of model to be loaded"""

label_encoder = preprocessing.LabelEncoder()
label_encoder.classes_ = np.load('encoder_classes.npy')

# load serialized model from file
model_datetime = "('20210818155130', {'max_depth': 7, 'n_estimators': 1000, 'eta': 1, 'verbosity': 3, 'objective': 'multi:softmax', 'num_class': 38})"

loaded_model = xgb.Booster()
loaded_model.load_model("model.bin")
print(loaded_model)

"""Test model with new string"""

test_text = "We provide information all cookies"
test_embedding = embed([test_text])

# Convert to numpy array
test_numpy = test_embedding.numpy()

#Create DMatrix
dtest = xgb.DMatrix(test_numpy)

prediction_num = loaded_model.predict(dtest)

print(prediction_num)

print(label_encoder.inverse_transform([int(prediction_num)]))