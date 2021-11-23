/* eslint-disable filenames/match-regex */

export interface CardsObject {
  cards: CardProps[];
}

export interface CardProps {
  caseBlur: string;
  grade: Grades;
  quote: string;
}

export enum Grades {
  Good = 'Good',
  Neutral = 'Neutral',
  Bad = 'Bad',
}
