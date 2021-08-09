import React from 'react';

import '../css/Results.css';
import { Searching } from './Searching';
import { Card } from './Card';

/** Components that displays the result cards of the TOS */
const Results: React.FC = () => {
  return (
    <div className="results-container grey-container-borders">
      {/* <Searching displaySearchingText /> */}
      <div className="margin-small">
        <Card />
      </div>
    </div>
  );
};

export { Results };
