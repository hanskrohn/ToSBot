import React from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip';
import { PieChart } from 'react-minimal-pie-chart';
import { caseObject } from '../types';
import CountUp from 'react-countup';
import '../css/Summary.css';

interface IProps {
  cases: caseObject[];
}

/** Summary Component, Displays Pie Chart, Cases found, and Overall Grade */
const Summary: React.FC<IProps> = (props: IProps) => {
  const { cases } = props;
  const numCases = cases.length;
  let totalScore = 0;
  let numBad = 0;
  let numNeutral = 0;
  let numGood = 0;
  for (let i = 0; i < numCases; i++) {
    // the lower, the better
    totalScore += cases[i].severity;
    if (cases[i].severity == 1) {
      numGood++;
    } else if (cases[i].severity == 2) {
      numNeutral++;
    } else {
      numBad++;
    }
  }
  const averageScore = totalScore / numCases;
  let overallRating = '';
  let insufficientDataFlag = false;
  if (numCases < 10) {
    overallRating = 'Neutral';
    insufficientDataFlag = true;
  }
  if (averageScore < 2.4 && averageScore > 1.6) {
    overallRating = 'Neutral';
  } else if (averageScore >= 2.4) {
    overallRating = 'Good';
  } else if (averageScore <= 1.6) {
    overallRating = 'Bad';
  }

  const generalResponse =
    'I parsed the TOS and mapped specific sentences to predefined common cases. I was trained with data collected from https://tosdr.org/.';

  const infoToolTipResponses = {
    neutral_insufficientData: 'The overall rating on this TOS is neutral because there was insuffucient data.',
    neutral: "The overall rating on this TOS is neutral. It's not bad, but not good either.",
    bad: 'The overall rating on this TOS is bad. You should be careful about using this service!',
    good: 'The overall rating on this TOS is good. This service strives to protect its users!',
  };

  const getToolTipResponse = () => {
    if (overallRating == 'Neutral') {
      if (insufficientDataFlag) {
        return infoToolTipResponses.neutral_insufficientData;
      } else {
        return infoToolTipResponses.neutral;
      }
    } else if (overallRating == 'Bad') {
      return infoToolTipResponses.bad;
    } else {
      return infoToolTipResponses.good;
    }
  };

  return (
    <div className="summary-container grey-container-borders">
      <div id="info-container">
        <div id="info-tooltip-icon" data-tip="info-tooltip" data-for="info-tooltip">
          <FaInfoCircle color="#888888" />
        </div>
        <div className="infobox">
          <h4>Overall Score</h4>
          <div className={'score ' + overallRating.toLowerCase()}>{overallRating}</div>
        </div>
        <div className="infobox">
          <h4>Cases Found</h4>
          <div className="score">
            <CountUp start={0} end={numCases} duration={1} />
          </div>
        </div>
        <div className="infobox">
          <h4>Breakdown</h4>
          <PieChart
            data={[
              { title: 'Bad', value: numBad, color: '#ce5347' },
              { title: 'Neutral', value: numNeutral, color: '#f5c451' },
              { title: 'Good', value: numGood, color: '#58a942' },
            ]}
            animate={true}
            style={{ height: '45px', marginTop: '-10px', marginLeft: '-18px' }}
          />
        </div>
      </div>
      <ReactTooltip
        id="info-tooltip"
        type="light"
        effect="solid"
        overridePosition={({ left, top }, _currentEvent, currentTarget) => {
          top = 50;
          left = 50;
          return { top, left };
        }}
      >
        <span id="tooltip-content">{getToolTipResponse() + ' ' + generalResponse}</span>
      </ReactTooltip>
    </div>
  );
};

export { Summary };
