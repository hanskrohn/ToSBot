import React from 'react';

import { Grades } from './Grade';
import { FilterBy } from './FilterBy';
import { OrderBy, OrderByStates } from './OrderBy';

interface FiltersProps {
  setFilterBy: React.Dispatch<React.SetStateAction<Set<Grades>>>;
  setOrderBy: React.Dispatch<React.SetStateAction<OrderByStates>>;
  filterBy: Set<Grades>;
}

/** Component to display both filter dropdowns */
const Filters: React.FC<FiltersProps> = (props: FiltersProps) => {
  const { setFilterBy, filterBy, setOrderBy } = props;
  return (
    <>
      <div>
        <OrderBy setOrderBy={setOrderBy} />
      </div>
      <div>
        <FilterBy setFilterBy={setFilterBy} filterBy={filterBy} />
      </div>
    </>
  );
};

export { Filters };
