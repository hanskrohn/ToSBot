/* eslint-disable filenames/match-regex */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line filenames/match-regex

function getDomContent() {
  // alert('hello');
  // chrome.scripting.executeScript(null, {
  //   code: 'alert(document.documentElement.outerHTML)',
  // });

  chrome.tabs.query({ active: true }, function (tabs) {
    let tab = tabs[0];
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: myFunction,
    });
  });

  return document.documentElement.outerHTML;
}

function myFunction() {
  alert(document.documentElement.outerHTML);
}

module.exports = {
  getDomContent,
};
