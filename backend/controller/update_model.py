import numpy as np
import os
import io
from googleapiclient.discovery import build
from google.oauth2.service_account import Credentials
from googleapiclient.http import MediaIoBaseDownload

from retrain_helper import *

def download_model_and_reports(new_model_datetime):
    creds = Credentials.from_service_account_file('tosbot-341910-9c08921c7c2b.json')

    service = build('drive', 'v3', credentials=creds)
    print(service)

    # Get gdrive folder ID
    results = service.files().list(
        q=f"name='{new_model_datetime}'", pageSize=1, fields="nextPageToken, files(id, name)").execute()
    folder_obj = results.get('files', [])[0]

    # Get new model accuracy file
    results = service.files().list(
        q=f"name='accuracy.txt' and parents in '{folder_obj['id']}'", pageSize=1, fields="nextPageToken, files(id, name)").execute()
    accuracy_obj = results.get('files', [])[0]
    
    request = service.files().get_media(fileId=accuracy_obj['id'])
    fh = io.BytesIO()
    downloader = MediaIoBaseDownload(fd=fh, request=request)
    done = False

    while not done:
        status, done = downloader.next_chunk()
        print ("Accuracy download %d%%." % int(status.progress() * 100))
    fh.seek(0)

    with open('new_accuracy.txt', 'wb') as f:
        f.write(fh.read())
        f.close()
    
    # Get new model file
    results = service.files().list(
        q=f"name='model_new.bin' and parents in '{folder_obj['id']}'", pageSize=1, fields="nextPageToken, files(id, name)").execute()
    accuracy_obj = results.get('files', [])[0]
    
    request = service.files().get_media(fileId=accuracy_obj['id'])
    fh = io.BytesIO()
    downloader = MediaIoBaseDownload(fd=fh, request=request)
    done = False

    while not done:
        status, done = downloader.next_chunk()
        print ("Model download %d%%." % int(status.progress() * 100))
    fh.seek(0)

    with open('new_model.bin', 'wb') as f:
        f.write(fh.read())
        f.close()

    # Get new encoder file
    results = service.files().list(
        q=f"name='encoder_classes.npy' and parents in '{folder_obj['id']}'", pageSize=1, fields="nextPageToken, files(id, name)").execute()
    accuracy_obj = results.get('files', [])[0]
    
    request = service.files().get_media(fileId=accuracy_obj['id'])
    fh = io.BytesIO()
    downloader = MediaIoBaseDownload(fd=fh, request=request)
    done = False

    while not done:
        status, done = downloader.next_chunk()
        print ("Encoder download %d%%." % int(status.progress() * 100))
    fh.seek(0)

    with open('new_encoder_classes.npy', 'wb') as f:
        f.write(fh.read())
        f.close()
    
    return

def compare_accuracy(new_model_datetime):
    current_accuracy_file = np.loadtxt(r"accuracy.txt")
    current_accuracy = float(current_accuracy_file)

    new_accuracy_file = np.loadtxt(r"new_accuracy.txt")
    new_accuracy = float(new_accuracy_file)

    print(f'Previous model performance: {current_accuracy}')
    print(f'New model performance: {new_accuracy}')


    # Check if new model has greater testing accuracy
    if new_accuracy > current_accuracy:
        print("new better")
        # Delete deprecated model if there is one
        try:
            os.remove('model_deprecated.bin')
            os.remove('encoder_classes_deprecated.npy')
        except:
            pass

        # Rename old model as model_deprecated
        os.rename('model.bin', 'model_deprecated.bin')
        os.rename('encoder_classes.npy', 'encoder_classes_deprecated.npy')
        os.remove('accuracy.txt')
        
        
        # Rename new model as model.bin
        os.rename('new_model.bin', 'model.bin')
        os.rename('new_accuracy.txt', 'accuracy.txt')
        os.rename('new_encoder_classes.npy', 'encoder_classes.npy')

        resetVoteData()

        # Restart server!!??

    else:
        print("New model not better, deleting temporary new files")
        os.remove('new_accuracy.txt')
        os.remove('new_model.bin')
        os.remove('new_encoder_classes.npy')

        hardResetVoteData()

def driver(new_model_datetime):
    download_model_and_reports(new_model_datetime)
    compare_accuracy(new_model_datetime)    
    # download_model_and_reports('20211222021247')
    # compare_accuracy('20211222021247')
