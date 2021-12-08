import React, { useState, useEffect } from 'react';

import '../css/Summary.css';
import { Grade } from './Grade';
import { Grades } from '../types';

/** Summary Component, Displays Pie Chart, Cases found, and Overall Grade */
const Summary: React.FC = () => {
  return (
    <div className="summary-container grey-container-borders">
      <div>Case summary here</div>
    </div>
  );
};

export { Summary };
