import React from 'react';

import '../css/Summary.css';
import { Searching } from './Searching';

/** Summary Component, Displays Pie Chart, Cases found, and Overall Grade */
const Summary: React.FC<any> = () => {
  return (
    <div className="summary-container grey-container-borders">
      <Searching />
    </div>
  );
};

export { Summary };
