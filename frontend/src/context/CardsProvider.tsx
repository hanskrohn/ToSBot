import React, { createContext, useState, FC } from 'react';
import { CardsObject } from '../types';

interface CardsContextState {
  cards: CardsObject;
  setCards: (cards: CardsObject) => void;
}

const initState = {
  cards: { cards: [] },
  setCards: () => {
    throw new Error('setCards not defined yet');
  },
};

export const CardsContext = createContext<CardsContextState>(initState);

export const CardsProvider: FC = ({ children }) => {
  const [cards, setCards] = useState<CardsObject>({ cards: [] });

  return <CardsContext.Provider value={{ cards, setCards }}>{children}</CardsContext.Provider>;
};
