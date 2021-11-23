/* eslint-disable no-dupe-keys */
/* eslint-disable filenames/match-regex */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line filenames/match-regex
import { setHTML } from './htmlContent.ts';

export function getDomContent() {
  return new Promise((resolve, reject) => {
    function getDocumentHTML() {
      return document.documentElement.innerHTML;
    }

    chrome.tabs.query({ active: true }, function (tabs) {
      let tab = tabs[0];
      chrome.scripting.executeScript(
        {
          target: { tabId: tab.id },
          func: getDocumentHTML,
        },
        (injectionResults) => {
          for (const frameResult of injectionResults) {
            setHTML(frameResult.result);
          }
          resolve();
        }
      );
    });
  });
}
