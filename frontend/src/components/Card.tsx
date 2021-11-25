import React from 'react';

import '../css/Card.css';
import { Grade } from './Grade';
import { CaseExpansion } from './CaseExpansion';
import { HiOutlineArrowDown, HiOutlineArrowUp } from 'react-icons/hi';
import { useState } from 'react';
import { caseObject } from '../types';

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

interface IProps {
  card: caseObject;
  voteSubmitHandler: (case_text: string, source_text: string, voteType: string) => void;
}

/** Card component to display card */
const Card: React.FC<IProps> = (props: IProps) => {
  const { card, voteSubmitHandler } = props;
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
          <p>{card.case_text}</p>
        </div>
      </div>
      <div className="card-content-container flex">
        <div className="card-subtitle">
          <h5>Grade:</h5>
        </div>
        <div className="card-content">
          <Grade grade={card.severity} />
          <div className="expand-card " role="button" onClick={changeExpandableButton}>
            {expandableButton}
          </div>
        </div>
      </div>
      {expandableButton === collapse && (
        <>
          <div className="card-content-container flex">
            <div className="card-subtitle">
              <h5>Quote:</h5>
            </div>
            <div className="card-content">
              <p>{card.source_text}</p>
            </div>
          </div>
          <CaseExpansion
            case_string={card.case_text}
            quote={card.source_text}
            hasVoted={card.has_voted}
            voteType={card.vote_type}
            voteSubmitHandler={voteSubmitHandler}
          />
        </>
      )}
    </div>
  );
};

export { Card };
