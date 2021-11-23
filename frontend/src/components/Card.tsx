import React from 'react';

import '../css/Card.css';
import { Grade } from './Grade';
import { HiOutlineArrowDown, HiOutlineArrowUp } from 'react-icons/hi';
import { useState } from 'react';
import { CardProps } from '../types';

const expand: JSX.Element = (
  <>
    <p>Click to expand&nbsp;</p>
    <HiOutlineArrowDown />
  </>
);

const collapse: JSX.Element = (
  <>
    <p>Click to collapse&nbsp;</p>
    <HiOutlineArrowUp />
  </>
);

/** Card component to display card */
const Card: React.FC<CardProps> = (props: CardProps) => {
  const { caseBlur, grade, quote } = props;
  const [expandableButton, setExpandableButton] = useState<JSX.Element>(expand);

  /** Change the direction of the expandable button. Expand -> Collapse Collapse -> Expand */
  const changeExpandableButton = (): void => {
    if (expandableButton === expand) {
      setExpandableButton(collapse);
      return;
    }
    setExpandableButton(expand);
  };

  return (
    <div className="card">
      <div className="card-content-container flex">
        <div className="card-subtitle">
          <h5>Case:</h5>
        </div>
        <div className="card-content">
          <p>{caseBlur}</p>
        </div>
      </div>
      <div className="card-content-container flex">
        <div className="card-subtitle">
          <h5>Grade:</h5>
        </div>
        <div className="card-content">
          <Grade grade={grade} />
          <div className="expand-card " role="button" onClick={changeExpandableButton}>
            {expandableButton}
          </div>
        </div>
      </div>
      {expandableButton === collapse && (
        <div className="card-content-container flex">
          <div className="card-subtitle">
            <h5>Quote:</h5>
          </div>
          <div className="card-content">
            <p>{quote}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export { Card };
