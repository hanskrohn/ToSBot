import React from 'react';

import '../css/Grade.css';

interface GradeProps {
  grade: number;
}

/** Component to display Grades */
const Grade: React.FC<GradeProps> = (props: GradeProps) => {
  const { grade } = props;

  const gradeArray = ['Good', 'Neutral', 'Bad'];

  return <h3 className={gradeArray[grade - 1].toLowerCase()}>{gradeArray[grade - 1]}</h3>;
};

export { Grade };
