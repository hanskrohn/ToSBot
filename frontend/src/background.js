/* eslint-disable no-control-regex */
/* eslint-disable no-dupe-keys */
/* eslint-disable filenames/match-regex */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line filenames/match-regex
import { setHTML, setURL } from './helper.ts';

export function getDomContent() {
  return new Promise((resolve, reject) => {
    function getDocumentHTML() {
      const rawText = document.body.innerText;
      const lineSeparatedArray = rawText.split(/\r\n|\r|\n|\t/);
      console.log(lineSeparatedArray);
      for (var j = 0; j < lineSeparatedArray.length; j++) {
        if (
          !lineSeparatedArray[j].endsWith('.') &&
          !lineSeparatedArray[j].endsWith(';') &&
          !lineSeparatedArray[j].endsWith(',') &&
          !lineSeparatedArray[j].endsWith(':') &&
          !lineSeparatedArray[j].endsWith(' or') &&
          !lineSeparatedArray[j].endsWith(' and')
        ) {
          if (j < lineSeparatedArray.length - 1) {
            if (/[a-z]/.test(lineSeparatedArray[j + 1].charAt(0))) {
              // if the subsequent line begins with a lowercase letter
              // then this might be an exception, simply continue the loop
              continue;
            }
          }
          // remove if this phrase doesn't end with a period or some trailing indicator that it goes on in the next line
          lineSeparatedArray.splice(j, 1);
          j--;
        }
      }
      const cleanedString = lineSeparatedArray.join('\n');
      // a significant improvement would be using an NLP-based sentence tokenizer
      // this is kind of hacky and fails a ton of edge cases
      // i.e., sentences that start with numbers are missed.
      const sentenceSeparatedString = cleanedString.replace(/([.?!])\s*(?=[A-Z])/g, '$1|');
      // string is now separated in to sentences marked by "|" as the separator

      const sentenceSeparatedArray = sentenceSeparatedString.split('|');
      for (var k = 0; k < sentenceSeparatedArray.length; k++) {
        // replace all in-sentence breaking symbol occurences with spaces
        sentenceSeparatedArray[k].replace(/[\r\n\x0B\x0C\u0085\u2028\u2029]+/g, ' ');
        // remove all suspiciously short sentences ( sub 10 characters)
        if (sentenceSeparatedArray[k].length < 10) {
          sentenceSeparatedArray.splice(k, 1);
          k--;
        }
      }
      // in the final pass we join sentences that were incorrectly parsed as "U.S"
      // this is a common enough edge case to justify it :(
      for (var l = 0; l < sentenceSeparatedArray.length; l++) {
        if (sentenceSeparatedArray[l].startsWith('S.') && l > 1) {
          if (sentenceSeparatedArray[l - 1].endsWith('U.')) {
            const newSentence = sentenceSeparatedArray[l - 1] + sentenceSeparatedArray[l];
            sentenceSeparatedArray.splice(l - 1, 2, newSentence);
          }
        }
      }
      return sentenceSeparatedArray.join('|');
    }

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
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

export function getWebsiteURL() {
  const getTOSurl = () => {
    return window.location.href;
  };

  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      let tab = tabs[0];
      chrome.scripting.executeScript(
        {
          target: { tabId: tab.id },
          func: getTOSurl,
        },
        (injectionResults) => {
          for (const frameResult of injectionResults) {
            setURL(frameResult.result);
          }
          resolve();
        }
      );
    });
  });
}
