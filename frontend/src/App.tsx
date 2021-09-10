import React, { useEffect, useState } from 'react';

import './css/App.css';
import { Summary } from './components/Summary';
import { Results } from './components/Results';
import { HighlightButton } from './components/HighlightButton';

/** Function to Load React App */
function App(): JSX.Element {
  const [show, setShow] = useState<boolean>(true);

  useEffect(() => {
    const html = document.documentElement.outerHTML;
    const data = { html };
    const abortCtrl = new AbortController();

    fetch('http://127.0.0.1:5000/api', {
      method: 'POST',
      headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'application/json',
      },
      signal: abortCtrl.signal,
      body: JSON.stringify(data),
    })
      .then((data) => {
        data.json();
        setShow(false);
      })
      .then((res) => {
        console.log(res);
      });

    return () => abortCtrl.abort();
  }, []);

  return (
    <div className="container">
      {show && <Summary />}
      <Results />
      <HighlightButton />
    </div>
  );
}

export default App;
