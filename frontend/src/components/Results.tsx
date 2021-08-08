import React from 'react';

import '../css/Results.css';
import { Searching } from './Searching';

/** Components that displays the result cards of the TOS */
const Results: React.FC<any> = () => {
  return (
    <div className="results-container grey-container-borders">
      <Searching displaySearchingText />
    </div>
  );
};

export { Results };
