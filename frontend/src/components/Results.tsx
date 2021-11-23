import React, { useState, useEffect, useContext } from 'react';

import '../css/Results.css';
import { Card } from './Card';
import { Grades, CardProps } from '../types';
import { OrderByStates } from './OrderBy';
import { Filters } from './Filters';
import { CardsContext } from '../context/CardsProvider';

/** Components that displays the result cards of the TOS */
const Results: React.FC = () => {
  const [filterBy, setFilterBy] = useState<Set<Grades>>(new Set<Grades>([Grades.Good, Grades.Bad, Grades.Neutral]));
  const [orderBy, setOrderBy] = useState<OrderByStates>(OrderByStates.AsTheyAppear);
  const { cards } = useContext(CardsContext);

  /** TODO: This function will be removed and replaced with actual grades attached to each case */
  const createList = () => {
    const list = [];
    for (let i = 0; i < 100; i++) {
      list.push({
        caseBlur: ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos accusantium architecto sint facere!
        Sed quos consectetur incidunt mollitia rem dignissimos nulla ullam cum iure veniam harum officia dicta,
        fugiat ex.`,
        grade: getRandomGrade(),
        quote: ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos accusantium architecto sint facere!
        Sed quos consectetur incidunt mollitia rem dignissimos nulla ullam cum iure veniam harum officia dicta,
        fugiat ex.`,
      });
    }

    return list;
  };

  const getRandomGrade = (): Grades => {
    const cases = {
      0: Grades.Good,
      1: Grades.Bad,
      2: Grades.Neutral,
    };
    const num = Math.floor(Math.random() * 3);
    return cases[num] ?? Grades.Neutral;
  }; // TODO: This will removed and replaced with actuall cases
  const [cardsS, setCards] = useState<CardProps[]>(createList());

  /** Function to filter the list of cards by the selected filters */
  const filterTempCards = (): CardProps[] => {
    const newList: CardProps[] = [];

    cardsS.forEach((card) => {
      if (filterBy.has(card.grade)) {
        newList.push(card);
      }
    });

    return newList;
  };

  /** Determine order of sorting and sort the cards */
  const sortCards = (cards: CardProps[]): CardProps[] => {
    if (orderBy === OrderByStates.AsTheyAppear) {
      return cards;
    }

    let order: Grades[];
    if (orderBy === OrderByStates.GoodToBad) {
      order = [Grades.Good, Grades.Neutral, Grades.Bad];
    } else {
      order = [Grades.Bad, Grades.Neutral, Grades.Good];
    }

    return sort(cards, order);
  };

  /**
   * Sorts the cards[] according to the order provided. Only works if order is of length 3
   *
   * @param cards - CardProps[] you want to sort
   * @param order - The order you want to sorth them in
   * @returns - Sorted CardProps[]
   */
  const sort = (cards: CardProps[], order: Grades[]): CardProps[] => {
    const firstValue = order[0];
    const secondValue = order[1];

    let firstIdx = 0;
    let secondIdx = 0;
    let thirdIdx = cards.length - 1;

    while (secondIdx <= thirdIdx) {
      const currCard = cards[secondIdx];

      if (currCard.grade === firstValue) {
        swap(firstIdx, secondIdx, cards);
        firstIdx++;
        secondIdx++;
      } else if (currCard.grade === secondValue) {
        secondIdx++;
      } else {
        swap(secondIdx, thirdIdx, cards);
        thirdIdx--;
      }
    }

    return cards;
  };

  /** Swap Cards in cards array */
  const swap = (i: number, j: number, cards: CardProps[]): void => {
    const temp = cards[i];
    cards[i] = cards[j];
    cards[j] = temp;
  };

  useEffect(() => {
    const newCardList = filterTempCards();
    const newCardOrder = sortCards(newCardList);

    setCards([...newCardOrder]);
  }, [filterBy, orderBy]);

  return (
    <div className="results-container grey-container-borders">
      <div className="filter-container">
        <Filters setFilterBy={setFilterBy} filterBy={filterBy} setOrderBy={setOrderBy} />
      </div>
      {/* <Searching displaySearchingText /> */}
      <div className="results">
        {cardsS.map((card, i) => {
          return (
            <div key={i} className="margin-small">
              <Card caseBlur={card.caseBlur} grade={card.grade} quote={card.quote} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { Results };
