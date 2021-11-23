/* eslint-disable filenames/match-regex */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line filenames/match-regex
import React, { useContext } from 'react';

export function getDomContent() {
  chrome.tabs.query({ active: true }, function (tabs) {
    let tab = tabs[0];
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        function: myFunction,
      },
      requestData
    );
  });
}

function myFunction() {
  return document.documentElement.outerHTML;
}

function requestData(result) {
  alert(result);
}
