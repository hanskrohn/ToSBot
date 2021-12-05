# Getting started

Make sure you have the latest version of Python installed. You can check with `python --version`

## MacOS/Linux

### Creating venv

If you would like to create a venv to hold the variables needed run:
`python3 -m venv <DIR>`

after the environment is created run:
`source <DIR>/bin/activate`

to start the virtual environment.
To exit the virtual evironment run:
`deactivate`

After you have created your virtual environment and have it running run the command
`pip install -r requirements.txt`
to install all the necessary extensions.

### Not using venv

If you decided to not use a venv just run:
`pip install -r requirements.txt`

## Windows

### Creating venv

If you would like to create a venv to hold the variables needed run:
`py -m venv <DIR>`

after the environment is created run:
`<DIR>\Scripts\activate`

to start the virtual environment.
To exit the virtual evironment run:
`deactivate`

After you have created your virtual environment and have it running run the command
`pip install -r requirements.txt`
to install all the necessary extensions.

### Not using venv

If you decided to not use a venv just run:
`pip install -r requirements.txt`

## Starting the project

Make sure to create a `.env` file and pass the correct MongoDB url connection. Once you have done this, simply write `python api.py` to start the REST API. If you are using a venv remember to start the venv environment everytime before running `python api.py`.

Regarding ML integration:
IF YOU GET ERROR: "OSError: SavedModel file does not exist at: C:\Users\Admin\AppData\Local\Temp\tfhub_modules\063d866c06683311b44b4992fd46003be952409c\{saved_model.pbtxt|saved_model.pb}"

DELETE THE FILE NAMED WITH THE HASH ABOVE