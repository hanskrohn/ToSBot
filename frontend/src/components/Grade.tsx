import React from 'react';

import '../css/Grade.css';

interface GradeProps {
  grade: Grades;
}

export enum Grades {
  Excellent,
  Good,
  Neutral,
  Bad,
  Awful,
}

/** Component to display Grades */
const Grade: React.FC<GradeProps> = (props: GradeProps) => {
  const { grade } = props;

  if (grade === Grades.Excellent) {
    return <h3 className="excellent">Excellent</h3>;
  }

  if (grade === Grades.Good) {
    return <h3 className="good">Good</h3>;
  }

  if (grade === Grades.Bad) {
    return <h3 className="bad">Bad</h3>;
  }

  if (grade === Grades.Awful) {
    return <h3 className="awful">Awful</h3>;
  }

  return <h3 className="neutral">Neutral</h3>;
};

export { Grade };
