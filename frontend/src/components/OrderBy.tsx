import React, { useState } from 'react';

import { BsJustify, BsFilter } from 'react-icons/bs';
import { IoMdArrowDropdown } from 'react-icons/io';

import '../css/Filters.css';
import '../css/Grade.css';

export enum OrderByStates {
  AsTheyAppear,
  GoodToBad,
  BadToGood,
}

interface ElementAndOrder {
  element: JSX.Element;
  orderBy: OrderByStates;
}

interface AsTheyAppearElementsAndOrder {
  asTheyAppear: ElementAndOrder;
  goodToBad: ElementAndOrder;
  badToGood: ElementAndOrder;
}
interface AsTheyAppearOptions {
  selected: ElementAndOrder;
  display: ElementAndOrder[];
}

export const AsTheyAppearOptionsMap: AsTheyAppearElementsAndOrder = {
  asTheyAppear: {
    element: (
      <>
        <BsJustify />
        <p>As They Appear</p>
      </>
    ),
    orderBy: OrderByStates.AsTheyAppear,
  },
  goodToBad: {
    element: (
      <>
        <BsFilter />
        <p>Good to Bad</p>
      </>
    ),
    orderBy: OrderByStates.GoodToBad,
  },
  badToGood: {
    element: (
      <>
        <BsFilter className="flip-upside-down" />
        <p>Bad to Good</p>
      </>
    ),
    orderBy: OrderByStates.BadToGood,
  },
};

interface OrderByProps {
  setOrderBy: React.Dispatch<React.SetStateAction<OrderByStates>>;
}

/** Create the filter dropdown */
const OrderBy: React.FC<OrderByProps> = (props: OrderByProps) => {
  const { setOrderBy } = props;
  const [seeOptions, setSeeOptions] = useState<boolean>(false);
  const [options, setOptions] = useState<AsTheyAppearOptions>({
    selected: AsTheyAppearOptionsMap.asTheyAppear,
    display: [AsTheyAppearOptionsMap.goodToBad, AsTheyAppearOptionsMap.badToGood],
  });

  /** Function to toggle seeOptions state */
  const toggleSeeOptions = (): void => {
    setSeeOptions(!seeOptions);
  };

  /**
   * Function to update the options state
   *
   * @param option - ElementAndOrder The selected option
   */
  const selectOption = (option: ElementAndOrder): void => {
    const index = options.display.indexOf(option);
    const currSelectedOption: ElementAndOrder = options.selected;
    options.selected = option;
    options.display[index] = currSelectedOption;

    setOrderBy(option.orderBy);
    setOptions({ ...options });
    toggleSeeOptions();
  };

  return (
    <>
      <div className="dropdown-button" role="button" onClick={toggleSeeOptions}>
        <div className="content">{options.selected.element}</div>
        <div>
          <IoMdArrowDropdown />
        </div>
      </div>
      {seeOptions && (
        <div className="options">
          {options.display.map((option, i) => (
            <div className="option" key={i} role="button" onClick={() => selectOption(option)}>
              {option.element}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export { OrderBy };
