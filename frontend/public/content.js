/* eslint-disable filenames/match-regex */
/*global chrome*/
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log(message);
  // switch (message.command) {
  //   case 'init':
  //     {
  //       console.log('popup is open');
  //     }
  //     break;
  // }
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.command === 'init') {
    chrome.tabs.executeScript({
      code: 'document.body.style.backgroundColor="red"',
    });
    // addListeners();
  }
  // } else {
  //   removeListeners();
  // }
  // sendResponse({ result: 'success' });
});
