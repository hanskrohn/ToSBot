import numpy as np
import os

def compare_accuracy(new_model_datetime):
    current_accuracy_file = np.loadtxt(r"accuracy.txt")
    current_accuracy = float(current_accuracy_file)

    # new_accuracy_file = np.loadtxt(r"new_accuracy.txt")
    # new_accuracy = float(new_accuracy_file)

    # Check if new model has greater testing accuracy
    new_accuracy = 0
    if new_accuracy > current_accuracy:
        print(new_model_datetime)
        
        # Use download api for whatever storage service we are using to download model corresponding to new datetime 
        # Rename old model as model_deprecated
        # Rename new model as model.bin
        # Restart server

    else:
        os.remove(r"new_accuracy.txt")
        # os.remove(r'.\controller\new_accuracy.txt")


compare_accuracy('test')