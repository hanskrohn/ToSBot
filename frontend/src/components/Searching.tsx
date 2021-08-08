import React from 'react';
import { CgSearchLoading } from 'react-icons/cg';

import '../css/Searching.css';

interface SearchingProps {
  displaySearchingText?: boolean;
}

/** Component to display Searching icon */
const Searching: React.FC<SearchingProps> = (props: SearchingProps) => {
  const { displaySearchingText } = props;

  return (
    <div className="stack-grow">
      <CgSearchLoading className="magnifying-glass" />
      {displaySearchingText && <p className="searching-text">Searching TOS...</p>}
    </div>
  );
};

export { Searching };
