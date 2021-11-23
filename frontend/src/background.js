/* eslint-disable filenames/match-regex */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line filenames/match-regex
// import { CardsProvider } from './context/CardsProvider';
import { setHTML } from './temp.ts';

export function getDomContent() {
  // const { setCards } = useContext(CardsContext);
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true }, function (tabs) {
      let tab = tabs[0];
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: () => {
          setHTML(document.documentElement.outerHTML);
          alert('hi');
          resolve();
        },
      });
    });
  });
}
