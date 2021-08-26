import React from 'react';

import '../css/Grade.css';

interface GradeProps {
  grade: Grades;
}

export enum Grades {
  Good = 'Good',
  Neutral = 'Neutral',
  Bad = 'Bad',
}

/** Component to display Grades */
const Grade: React.FC<GradeProps> = (props: GradeProps) => {
  const { grade } = props;

  if (grade === Grades.Good) {
    return <h3 className="good">{Grades.Good}</h3>;
  }

  if (grade === Grades.Bad) {
    return <h3 className="bad">{Grades.Bad}</h3>;
  }

  return <h3 className="neutral">Neutral</h3>;
};

export { Grade };
