/* eslint-disable filenames/match-regex */

export interface caseObject {
  source_text: string;
  has_case: boolean;
  severity: number;
  case_text: string;
  match_confidence: number;
  has_voted?: boolean;
  vote_type?: 'upvote' | 'downvote' | null;
}

export enum Grades {
  Good = 'Good',
  Neutral = 'Neutral',
  Bad = 'Bad',
}
