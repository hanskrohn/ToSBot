import React from 'react';

import '../css/Card.css';
import { Grade, Grades } from './Grade';

/** Card component to display card */
const Card: React.FC = () => {
  return (
    <div className="card">
      <div className="card-content-container">
        <div className="card-subtitle">
          <h5>Case:</h5>
        </div>
        <div className="card-content">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos accusantium architecto sint facere! Sed
            quos consectetur incidunt mollitia rem dignissimos nulla ullam cum iure veniam harum officia dicta, fugiat
            ex.
          </p>
        </div>
      </div>
      <div className="card-content-container">
        <div className="card-subtitle">
          <h5>Grade:</h5>
        </div>
        <div className="card-content">
          <Grade grade={Grades.Good} />
        </div>
      </div>
    </div>
  );
};

export { Card };
