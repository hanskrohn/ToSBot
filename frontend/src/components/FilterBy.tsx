import React, { useState } from 'react';
import { GrFormCheckmark } from 'react-icons/gr';
import { BsFilter } from 'react-icons/bs';
import { IoMdArrowDropdown } from 'react-icons/io';

import '../css/Filters.css';
import '../css/Grade.css';

import { Grades } from '../types';

interface FilterByProps {
  setFilterBy: React.Dispatch<React.SetStateAction<Set<Grades>>>;
  filterBy: Set<Grades>;
}

/** Create the filter dropdown */
const FilterBy: React.FC<FilterByProps> = (props: FilterByProps) => {
  const { setFilterBy, filterBy } = props;
  const [seeOptions, setSeeOptions] = useState<boolean>(false);

  /** Function to toggle seeOptions state */
  const toggleSeeOptions = (): void => {
    setSeeOptions(!seeOptions);
  };

  return (
    <>
      <div className="dropdown-button" role="button" onClick={toggleSeeOptions}>
        <div className="content">
          <BsFilter />
          <p>Filter By...</p>
        </div>
        <div>
          <IoMdArrowDropdown />
        </div>
      </div>
      {seeOptions && (
        <div className="options">
          <div className="option">
            <Checkbox setFilterBy={setFilterBy} filterBy={filterBy} grade={Grades.Good} />
            <p className="good">{Grades.Good}</p>
          </div>
          <div className="option">
            <Checkbox setFilterBy={setFilterBy} filterBy={filterBy} grade={Grades.Neutral} />
            <p className="neutral">{Grades.Neutral}</p>
          </div>
          <div className="option">
            <Checkbox setFilterBy={setFilterBy} filterBy={filterBy} grade={Grades.Bad} />
            <p className="bad">{Grades.Bad}</p>
          </div>
        </div>
      )}
    </>
  );
};

interface CheckboxProps {
  setFilterBy: React.Dispatch<React.SetStateAction<Set<Grades>>>;
  filterBy: Set<Grades>;
  grade: Grades;
}

/** Create Custom Checkbox */
const Checkbox: React.FC<CheckboxProps> = (props: CheckboxProps) => {
  const { setFilterBy, grade, filterBy } = props;

  /** Function to toggle isClicked state */
  const toggleIsClicked = (toggleOn: boolean): void => {
    if (toggleOn) {
      // Add this grade to setFilters
      filterBy.add(grade);
    } else {
      // Remove this grade from selFilters
      filterBy.delete(grade);
    }

    setFilterBy(new Set(filterBy));
  };

  if (filterBy.has(grade)) {
    return (
      <div className="checkbox clicked" role="button" onClick={() => toggleIsClicked(false)}>
        <GrFormCheckmark />
      </div>
    );
  }

  return <div className="checkbox" role="button" onClick={() => toggleIsClicked(true)}></div>;
};

export { FilterBy };
