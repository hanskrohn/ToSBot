import React, { useState, useEffect } from 'react';
import { BsFilterLeft } from 'react-icons/bs';
import { IoMdArrowDropdown } from 'react-icons/io';
import { GrFormCheckmark } from 'react-icons/gr';
import { FaSortAmountDownAlt, FaSortAmountUpAlt } from 'react-icons/fa';

import '../css/Filters.css';
import '../css/Grade.css';

import { Grades } from './Grade';

/** Create the filter dropdown */
const AsTheyAppear: React.FC = () => {
  const [seeOptions, setSeeOptions] = useState<boolean>(false);

  /** Function to toggle seeOptions state */
  const toggleSeeOptions = () => {
    setSeeOptions(!seeOptions);
  };

  return (
    <>
      <div className="dropdown-button" role="button" onClick={toggleSeeOptions}>
        <div className="content">
          <BsFilterLeft className="flip-upside-down" />
          <p>&nbsp;As They Appear</p>
        </div>
        <div>
          <IoMdArrowDropdown />
        </div>
      </div>
      {seeOptions && (
        <div className="options">
          <div className="option">
            <BsFilterLeft className="flip-upside-down" />
            <p>As They Appear</p>
          </div>
          <div className="option">
            <FaSortAmountDownAlt className="flip-upside-down" />
            <p>Good to Bad</p>
          </div>
          <div className="option">
            <FaSortAmountUpAlt className="flip-upside-down" />
            <p>Bad to Good</p>
          </div>
        </div>
      )}
    </>
  );
};

/** Create the filter dropdown */
const FilterBy: React.FC = () => {
  const [seeOptions, setSeeOptions] = useState<boolean>(false);

  /** Function to toggle seeOptions state */
  const toggleSeeOptions = () => {
    setSeeOptions(!seeOptions);
  };

  return (
    <>
      <div className="dropdown-button" role="button" onClick={toggleSeeOptions}>
        <div className="content">
          <BsFilterLeft className="flip-upside-down" />
          <p>&nbsp;Filter By...</p>
        </div>
        <div>
          <IoMdArrowDropdown />
        </div>
      </div>
      {seeOptions && (
        <div className="options">
          <div className="option">
            <Checkbox />
            <p className="good">{Grades.Good}</p>
          </div>
          <div className="option">
            <Checkbox />
            <p className="neutral">{Grades.Neutral}</p>
          </div>
          <div className="option">
            <Checkbox />
            <p className="bad">{Grades.Bad}</p>
          </div>
        </div>
      )}
    </>
  );
};

/** Create Custom Checkbox */
const Checkbox: React.FC = () => {
  const [isClicked, setIsClicked] = useState<boolean>(true);

  /** Function to toggle isClicked state */
  const toggleIsClicked = () => {
    setIsClicked(!isClicked);
  };

  if (isClicked) {
    return (
      <div className="checkbox clicked" role="button" onClick={toggleIsClicked}>
        <GrFormCheckmark />
      </div>
    );
  }

  return <div className="checkbox" role="button" onClick={toggleIsClicked}></div>;
};

/** Component to display both filter dropdowns */
const Filters: React.FC = () => {
  return (
    <>
      <div>
        <AsTheyAppear />
      </div>
      <div>
        <FilterBy />
      </div>
    </>
  );
};

export { Filters };
