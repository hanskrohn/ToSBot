# Getting started

Before getting started ensure you have Chrome installed. If you do not have Chrome, visit https://www.google.com/chrome/ to install Chrome on your machine.

If you already have Chrome, run `npm install` to install all the necessary packages.

After installing all the necessary packages, run `npm build`. This will create a build folder which will be used to test the app as a Chrome Extension.

After the build is completed visit chrome://extensions/. We will need to tell Chrome were to find this new extension.

Once you reach chrome://extensions/, in the top right of the page you should see an action to toggle "Developer Mode". After toggling "Developer Mode" some actions will appear. Click on "Load Unpacked", navigate to this project, and select the `build` folder. After you select the `build` folder you should be able to view this project as an extension and can deactivate "Developer Mode". We will not need to reactivate "Developer Mode" again.

# Workflow

The workflow for this extension is a little strange and I will be looking into improving it. At the moment, everytime you want to see the updates you will need to:

1. Run `npm build`
2. Visit chrome://extensions/
3. Hit the reload button on the extension

The workflow I recommend using is:

1. Run `npm start`
2. Develop as you normally would and view the changes in http://localhost:3000/. You will notice I added a max height and width in App.css, these are size constraints on all chrome extensions. DO NOT REMOVE THEM.
3. Before merges, run `npm build` and ensure the Chrome extension looks as expected.

# Resource

I also installed `@types/chrome`. I predict this will be a useful package moving forwards as it provides an API for many Chrome features. To view a list of the features and how to use visit https://developer.chrome.com/docs/extensions/reference/.
