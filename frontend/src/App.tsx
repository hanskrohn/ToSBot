import React, { useEffect, useState } from 'react';

import './css/App.css';
import { Summary } from './components/Summary';
import { Results } from './components/Results';
import { Searching } from './components/Searching';
import { HighlightButton } from './components/HighlightButton';
import { getDomContent } from './background.js';
import { getHTML } from './htmlContent';
import { caseObject } from './types';

/** Function to Load React App */
function App(): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [caseData, setCaseData] = useState<{ cards: caseObject[] } | null>(null);

  useEffect(() => {
    const abortCtrl = new AbortController();
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
          });
        },
        (err) => {
          console.error(err);
        }
      );
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
        <Summary />
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
