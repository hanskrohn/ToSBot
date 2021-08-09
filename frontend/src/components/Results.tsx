import React from 'react';

import '../css/Results.css';
import { Searching } from './Searching';
import { Card, CardProps } from './Card';
import { Grades } from './Grade';

/** Components that displays the result cards of the TOS */
const Results: React.FC = () => {
  /** TODO: This function will be removed and replaced with actual grades attached to each case */
  const getRandomGrade = (): Grades => {
    const cases = {
      0: Grades.Excellent,
      1: Grades.Good,
      2: Grades.Bad,
      3: Grades.Awful,
    };
    const num = Math.floor(Math.random() * 5);
    return cases[num] ?? Grades.Neutral;
  };
  // TODO: This will removed and replaced with actuall cases
  const tempCards: CardProps[] = [
    {
      caseBlur: ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos accusantium architecto sint facere!
      Sed quos consectetur incidunt mollitia rem dignissimos nulla ullam cum iure veniam harum officia dicta,
      fugiat ex.`,
      grade: getRandomGrade(),
      quote: ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos accusantium architecto sint facere!
      Sed quos consectetur incidunt mollitia rem dignissimos nulla ullam cum iure veniam harum officia dicta,
      fugiat ex.`,
    },
    {
      caseBlur: ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos accusantium architecto sint facere!
      Sed quos consectetur incidunt mollitia rem dignissimos nulla ullam cum iure veniam harum officia dicta,
      fugiat ex.`,
      grade: getRandomGrade(),
      quote: ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos accusantium architecto sint facere!
      Sed quos consectetur incidunt mollitia rem dignissimos nulla ullam cum iure veniam harum officia dicta,
      fugiat ex.`,
    },
    {
      caseBlur: ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos accusantium architecto sint facere!
      Sed quos consectetur incidunt mollitia rem dignissimos nulla ullam cum iure veniam harum officia dicta,
      fugiat ex.`,
      grade: getRandomGrade(),
      quote: ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos accusantium architecto sint facere!
      Sed quos consectetur incidunt mollitia rem dignissimos nulla ullam cum iure veniam harum officia dicta,
      fugiat ex.`,
    },
    {
      caseBlur: ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos accusantium architecto sint facere!
      Sed quos consectetur incidunt mollitia rem dignissimos nulla ullam cum iure veniam harum officia dicta,
      fugiat ex.`,
      grade: getRandomGrade(),
      quote: ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos accusantium architecto sint facere!
      Sed quos consectetur incidunt mollitia rem dignissimos nulla ullam cum iure veniam harum officia dicta,
      fugiat ex.`,
    },
    {
      caseBlur: ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos accusantium architecto sint facere!
      Sed quos consectetur incidunt mollitia rem dignissimos nulla ullam cum iure veniam harum officia dicta,
      fugiat ex.`,
      grade: getRandomGrade(),
      quote: ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos accusantium architecto sint facere!
      Sed quos consectetur incidunt mollitia rem dignissimos nulla ullam cum iure veniam harum officia dicta,
      fugiat ex.`,
    },
    {
      caseBlur: ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos accusantium architecto sint facere!
      Sed quos consectetur incidunt mollitia rem dignissimos nulla ullam cum iure veniam harum officia dicta,
      fugiat ex.`,
      grade: getRandomGrade(),
      quote: ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos accusantium architecto sint facere!
      Sed quos consectetur incidunt mollitia rem dignissimos nulla ullam cum iure veniam harum officia dicta,
      fugiat ex.`,
    },
    {
      caseBlur: ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos accusantium architecto sint facere!
      Sed quos consectetur incidunt mollitia rem dignissimos nulla ullam cum iure veniam harum officia dicta,
      fugiat ex.`,
      grade: getRandomGrade(),
      quote: ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos accusantium architecto sint facere!
      Sed quos consectetur incidunt mollitia rem dignissimos nulla ullam cum iure veniam harum officia dicta,
      fugiat ex.`,
    },
    {
      caseBlur: ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos accusantium architecto sint facere!
      Sed quos consectetur incidunt mollitia rem dignissimos nulla ullam cum iure veniam harum officia dicta,
      fugiat ex.`,
      grade: getRandomGrade(),
      quote: ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos accusantium architecto sint facere!
      Sed quos consectetur incidunt mollitia rem dignissimos nulla ullam cum iure veniam harum officia dicta,
      fugiat ex.`,
    },
    {
      caseBlur: ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos accusantium architecto sint facere!
      Sed quos consectetur incidunt mollitia rem dignissimos nulla ullam cum iure veniam harum officia dicta,
      fugiat ex.`,
      grade: getRandomGrade(),
      quote: ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos accusantium architecto sint facere!
      Sed quos consectetur incidunt mollitia rem dignissimos nulla ullam cum iure veniam harum officia dicta,
      fugiat ex.`,
    },
    {
      caseBlur: ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos accusantium architecto sint facere!
      Sed quos consectetur incidunt mollitia rem dignissimos nulla ullam cum iure veniam harum officia dicta,
      fugiat ex.`,
      grade: getRandomGrade(),
      quote: ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos accusantium architecto sint facere!
      Sed quos consectetur incidunt mollitia rem dignissimos nulla ullam cum iure veniam harum officia dicta,
      fugiat ex.`,
    },
    {
      caseBlur: ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos accusantium architecto sint facere!
      Sed quos consectetur incidunt mollitia rem dignissimos nulla ullam cum iure veniam harum officia dicta,
      fugiat ex.`,
      grade: getRandomGrade(),
      quote: ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos accusantium architecto sint facere!
      Sed quos consectetur incidunt mollitia rem dignissimos nulla ullam cum iure veniam harum officia dicta,
      fugiat ex.`,
    },
    {
      caseBlur: ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos accusantium architecto sint facere!
      Sed quos consectetur incidunt mollitia rem dignissimos nulla ullam cum iure veniam harum officia dicta,
      fugiat ex.`,
      grade: getRandomGrade(),
      quote: ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos accusantium architecto sint facere!
      Sed quos consectetur incidunt mollitia rem dignissimos nulla ullam cum iure veniam harum officia dicta,
      fugiat ex.`,
    },
    {
      caseBlur: ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos accusantium architecto sint facere!
      Sed quos consectetur incidunt mollitia rem dignissimos nulla ullam cum iure veniam harum officia dicta,
      fugiat ex.`,
      grade: getRandomGrade(),
      quote: ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos accusantium architecto sint facere!
      Sed quos consectetur incidunt mollitia rem dignissimos nulla ullam cum iure veniam harum officia dicta,
      fugiat ex.`,
    },
    {
      caseBlur: ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos accusantium architecto sint facere!
      Sed quos consectetur incidunt mollitia rem dignissimos nulla ullam cum iure veniam harum officia dicta,
      fugiat ex.`,
      grade: getRandomGrade(),
      quote: ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos accusantium architecto sint facere!
      Sed quos consectetur incidunt mollitia rem dignissimos nulla ullam cum iure veniam harum officia dicta,
      fugiat ex.`,
    },
    {
      caseBlur: ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos accusantium architecto sint facere!
      Sed quos consectetur incidunt mollitia rem dignissimos nulla ullam cum iure veniam harum officia dicta,
      fugiat ex.`,
      grade: getRandomGrade(),
      quote: ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos accusantium architecto sint facere!
      Sed quos consectetur incidunt mollitia rem dignissimos nulla ullam cum iure veniam harum officia dicta,
      fugiat ex.`,
    },
    {
      caseBlur: ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos accusantium architecto sint facere!
      Sed quos consectetur incidunt mollitia rem dignissimos nulla ullam cum iure veniam harum officia dicta,
      fugiat ex.`,
      grade: getRandomGrade(),
      quote: ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos accusantium architecto sint facere!
      Sed quos consectetur incidunt mollitia rem dignissimos nulla ullam cum iure veniam harum officia dicta,
      fugiat ex.`,
    },
  ];

  return (
    <div className="results-container grey-container-borders">
      {/* <Searching displaySearchingText /> */}
      {tempCards.map((card, i) => {
        return (
          <div key={i} className="margin-small">
            <Card caseBlur={card.caseBlur} grade={card.grade} quote={card.quote} />
          </div>
        );
      })}
    </div>
  );
};

export { Results };
