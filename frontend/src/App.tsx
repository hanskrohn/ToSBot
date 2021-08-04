import React from 'react';

import './css/App.css';
import { Summary } from './components/Summary';
import { Results } from './components/Results';
import { HighlightButton } from './components/HighlightButton';

/** Function to Load React App */
function App(): JSX.Element {
  return (
    <div className="container">
      <Summary />
      <Results />
      <HighlightButton />
    </div>
  );
}

export default App;
