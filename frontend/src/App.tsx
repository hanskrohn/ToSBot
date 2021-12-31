/*global chrome*/
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './css/App.css';
import { Summary } from './components/Summary';
import { Results } from './components/Results';
import { Searching } from './components/Searching';
import { HighlightButton } from './components/HighlightButton';
import { getDomContent, getWebsiteURL } from './background.js';
import { getHTML, getURL } from './helper';
import { caseObject } from './types';

/** Function to Load React App */
function App(): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [caseData, setCaseData] = useState<{ cards: caseObject[] } | null>(null);

  useEffect(() => {
    const abortCtrl = new AbortController();

    /* 
      TOSBOT client-side caching solution to minimize API calls and store UUID
    */
    // check if user has a UUID and previously loaded cases for the website, if so, check the timestamp.
    // only render from past data if < 1 day old (we want to avoid showing data from outdated TOS or models)
    // this minimizes redundant API calls to our backend (and improves user experience)
    getWebsiteURL().then(() => {
      const TOSurl = getURL();
      chrome.storage.local.get(['ToSBot-user-data'], (res) => {
        console.log(res);
        if (
          res === undefined ||
          (res && Object.keys(res).length === 0 && Object.getPrototypeOf(res) === Object.prototype)
        ) {
          // generate a new UUID and storage object for the user
          chrome.storage.local.set(
            {
              'ToSBot-user-data': {
                uuid: uuidv4(),
                websites: {},
              },
            },
            () => {
              queryAPI();
            }
          );
        } else {
          // user has previously used ToSBot, check if the website data is cached
          // we use the TOS url as a lookup key, a future improvement would be company name
          // eslint-disable-next-line no-prototype-builtins
          if (res['ToSBot-user-data'].websites.hasOwnProperty(TOSurl)) {
            // if the key is found, check if the cached data is not stale
            if (res['ToSBot-user-data'].websites[TOSurl].timestamp > Date.now() - 86400000) {
              setCaseData(res['ToSBot-user-data'].websites[TOSurl].caseData);
              setIsLoading(false);
            }
          } else {
            queryAPI();
          }
        }
      });

      const queryAPI = () => {
        getDomContent().then(() => {
          const html = getHTML();
          const data = { html };
          fetch('http://127.0.0.1:5000/api', {
            method: 'POST',
            headers: {
              // eslint-disable-next-line @typescript-eslint/naming-convention
              'Content-Type': 'application/json',
            },
            signal: abortCtrl.signal,
            body: JSON.stringify(data),
          }).then(
            (res) => {
              res.json().then((data) => {
                const stateData: { cards: caseObject[] } = data;
                // backend passes all sentences, we are only interested in sentences matched to cases
                stateData.cards = stateData.cards.filter((obj) => obj.has_case === true);
                // backend does not append this field but for FE state management we need it
                for (const caseObj of stateData.cards) {
                  caseObj.has_voted = false;
                  caseObj.vote_type = null;
                }
                setCaseData(stateData);
                setIsLoading(false);

                chrome.storage.local.get('ToSBot-user-data', (res) => {
                  const resCopy = { ...res }['ToSBot-user-data'];
                  resCopy.websites[TOSurl] = { timestamp: Date.now(), caseData: stateData };
                  console.log(resCopy);
                  // update user storage with latest data
                  chrome.storage.local.set({ 'ToSBot-user-data': resCopy });
                  // for
                });
              });
            },
            (err) => {
              console.error(err);
            }
          );
        });
      };
    });

    return () => abortCtrl.abort();
  }, []);

  return (
    <div className="container">
      {isLoading ? (
        <div id="summary-loading" className="grey-container-borders">
          <Searching displaySearchingText={false} />
        </div>
      ) : (
        <Summary cases={caseData.cards} />
      )}
      {isLoading ? (
        <div id="results-loading" className="grey-container-borders">
          <Searching displaySearchingText={true} />
        </div>
      ) : (
        <Results cases={caseData.cards} />
      )}
      <HighlightButton />
    </div>
  );
}

export default App;
