import React, { useState } from 'react';
import '../css/CaseExpansion.css';
import { HiOutlineThumbUp, HiOutlineThumbDown, HiThumbUp, HiThumbDown } from 'react-icons/hi';

export interface CardExpansionProps {
  case: string;
  quote: string;
}

/** CardExpansionUI component displays Show in TOS and upvote/downvote UI */
const CaseExpansion: React.FC<CardExpansionProps> = (props: CardExpansionProps) => {
  const [upvoteHover, setUpvoteHover] = useState(false);
  const [downvoteHover, setDownvoteHover] = useState(false);

  const [hasVoted, setHasVoted] = useState(false);
  const [voteType, setVoteType] = useState(null);

  /** Handler function fired when a vote is submitted by user */
  const onVoteClickHandler = (voteType: string) => {
    if (!hasVoted) {
      setHasVoted(true);
      if (voteType == 'upvote') {
        console.log('Upvote fired!');
        setVoteType('upvote');
      } else {
        console.log('Downvote fired!');
        setVoteType('downvote');
      }
    } else {
      return;
    }
  };

  return (
    <div id="case-expansion-id">
      <button id="show-in-tos-button">Show in TOS</button>
      <div id="help-tosbot-learn-prompt">
        <p>
          {!hasVoted ? (
            <>
              Help ToSBot learn! <br /> Rate this case accuracy:
            </>
          ) : (
            'Thank you for voting!'
          )}
        </p>
      </div>
      <div id="upvote-downvote-button-container">
        {voteType !== 'downvote' ? (
          <button
            className={!hasVoted ? 'case-vote-button' : 'case-vote-button noclick'}
            aria-labelledby="Click to upvote the case match"
            id="upvote-button"
            onMouseEnter={() => setUpvoteHover(true)}
            onMouseLeave={() => setUpvoteHover(false)}
            onClick={() => onVoteClickHandler('upvote')}
            disabled={hasVoted}
          >
            {upvoteHover || hasVoted ? <HiThumbUp color="#1A7800" /> : <HiOutlineThumbUp color="#1A7800" />}
          </button>
        ) : null}
        {voteType !== 'upvote' ? (
          <button
            className={!hasVoted ? 'case-vote-button' : 'case-vote-button noclick'}
            aria-labelledby="Click to downvote the case match"
            id="downvote-button"
            onMouseEnter={() => setDownvoteHover(true)}
            onMouseLeave={() => setDownvoteHover(false)}
            onClick={() => onVoteClickHandler('downvote')}
            disabled={hasVoted}
          >
            {downvoteHover || hasVoted ? <HiThumbDown color="#780000" /> : <HiOutlineThumbDown color="#780000" />}
          </button>
        ) : null}
      </div>
    </div>
  );
};

export { CaseExpansion };
