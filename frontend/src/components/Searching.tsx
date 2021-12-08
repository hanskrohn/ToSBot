import React from 'react';
import { CgSearch } from 'react-icons/cg';

import '../css/Searching.css';

interface SearchingProps {
  displaySearchingText?: boolean;
}

/** Component to display Searching icon */
const Searching: React.FC<SearchingProps> = (props: SearchingProps) => {
  const { displaySearchingText } = props;

  return (
    <div className="stack-grow">
      <div id="animated-icon">
        <CgSearch className="magnifying-glass" />
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      {displaySearchingText && <p className="searching-text">Searching TOS...</p>}
    </div>
  );
};

export { Searching };
