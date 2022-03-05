/*global chrome*/
import React, { useState, useEffect } from 'react';
import '../css/Results.css';
import { Card } from './Card';
import { Grades, caseObject } from '../types';
import { OrderByStates } from './OrderBy';
import { Filters } from './Filters';
import { getURL } from '../helper';

interface IProps {
  cases: caseObject[];
}

/** Components that displays the result cards of the TOS */
const Results: React.FC<IProps> = (props: IProps) => {
  const [filterBy, setFilterBy] = useState<Set<Grades>>(new Set<Grades>([Grades.Good, Grades.Bad, Grades.Neutral]));
  const [orderBy, setOrderBy] = useState<OrderByStates>(OrderByStates.AsTheyAppear);
  const [clientIP, setClientIP] = useState<string | null>(null);

  // state to manage the display order of cases. Defaults to what was initially provided (as they appear)
  const [sortedArray, setSortedArray] = useState<caseObject[] | null>(props.cases);

  // state to save the "as they appear" initial order. We need a copy because it gets manipulated at runtime.
  const [asTheyAppearArray, setAsTheyAppearArray] = useState<caseObject[] | null>(props.cases);

  /** Function to filter the list of cards by the selected filters */
  const filterTempCards = (): caseObject[] => {
    const newList: caseObject[] = [];
    const freshArray = [...asTheyAppearArray];
    freshArray.forEach((card) => {
      let cardGrade: Grades;
      if (card.severity == 1) cardGrade = Grades.Good;
      else if (card.severity == 2) cardGrade = Grades.Neutral;
      else cardGrade = Grades.Bad;

      if (filterBy.has(cardGrade)) {
        newList.push(card);
      }
    });
    return newList;
  };

  /** Determine order of sorting and sort the cards */
  const sortCards = (cards: caseObject[]): caseObject[] => {
    if (orderBy === OrderByStates.AsTheyAppear) {
      const freshArray = [...asTheyAppearArray];
      const returnArray: caseObject[] = [];
      for (let i = 0; i < freshArray.length; i++) {
        if (cards.includes(freshArray[i])) {
          returnArray.push(freshArray[i]);
        }
      }
      return returnArray;
    }
    // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    else if (orderBy === OrderByStates.GoodToBad) {
      return cards.sort((a, b) => a.severity - b.severity);
    } else {
      return cards.sort((a, b) => b.severity - a.severity);
    }
  };

  // vote handler which submit vote to POST endpoint and then update table
  // will use https://www.bigdatacloud.com/customer/account this service to get client IP to send to BE
  // backend will implement IP-based rate limit throttling
  // TBD on whether or not to store IP and force unique IP for upvotes/downvote writing to Mongo
  const hasVotedHandler = (case_text: string, source_text: string, voteType: 'upvote' | 'downvote') => {
    const tempSortedArray = [...sortedArray];
    const tempAsTheyAppearArray = [...asTheyAppearArray];

    for (let i = 0; i < tempSortedArray.length; i++) {
      if (tempSortedArray[i].source_text === source_text) {
        tempSortedArray[i].has_voted = true;
        tempSortedArray[i].vote_type = voteType;
      }
      if (tempAsTheyAppearArray[i].source_text === source_text) {
        tempAsTheyAppearArray[i].has_voted = true;
        tempAsTheyAppearArray[i].vote_type = voteType;
      }
    }
    setSortedArray([...tempSortedArray]);
    setAsTheyAppearArray([...tempAsTheyAppearArray]);

    // after FE state management to update hasVoted, fire request to backend
    chrome.storage.local.get(['ToSBot-user-data'], (res) => {
      // write upvote/downvote states to local storage (caching them)
      // this means that if the user opens ToSBot on the same site in a day, their upvotes and downvotes are preserved
      // its impractical to store them for longer in case the model is updated and the snippets change
      const resCopy = { ...res }['ToSBot-user-data'];
      const siteURL = getURL();
      const oldTimeStamp = resCopy.websites[siteURL].timestamp;
      resCopy.websites[siteURL] = { timestamp: oldTimeStamp, caseData: { cards: tempAsTheyAppearArray } };
      // update user storage with latest data
      chrome.storage.local.set({ 'ToSBot-user-data': resCopy });

      const uuid = res['ToSBot-user-data'].uuid;
      fetch('http://127.0.0.1:5000/vote', {
        method: 'POST',
        headers: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          case_text: case_text,
          source_text: source_text,
          voteType: voteType,
          // ip and uuid are used to secure API against abuse and perform checks
          clientIP: clientIP,
          uuid: uuid,
          url: siteURL,
          timestamp: Date.now(),
        }),
      }).then(
        (res) => {
          console.log(res);
          if (process.env.VOTE_DEBUG_MODE == 'true') {
            chrome.storage.local.clear().then(() => {
              console.log('DEBUG MODE: local storage reset');
            });
          }
        },
        (err) => {
          console.error(err);
        }
      );
    });
  };

  useEffect(() => {
    const newCardList = filterTempCards();
    const newCardOrder = sortCards(newCardList);
    setSortedArray([...newCardOrder]);
  }, [filterBy, orderBy]);

  useEffect(() => {
    const abortCtrl = new AbortController();
    fetch('http://ip-api.com/json', {
      method: 'GET',
      signal: abortCtrl.signal,
    }).then(
      (res) => {
        res.json().then((data) => {
          setClientIP(data.query);
        });
      },
      (err) => {
        console.error('Failed to resolve client IP address, ' + err);
      }
    );
  }, []);

  return (
    <div className="results-container grey-container-borders">
      <div className="filter-container">
        <Filters setFilterBy={setFilterBy} filterBy={filterBy} setOrderBy={setOrderBy} />
      </div>
      {/* <Searching displaySearchingText /> */}
      <div className="results">
        {sortedArray.map((card, i) => {
          return (
            <div key={i} className="margin-small">
              <Card card={card} voteSubmitHandler={hasVotedHandler} />
            </div>
          );
        })}
        {props.cases.length === 0 ? (
          <p id="no-cases">Uh oh! I couldn't automatically detect a ToS. Can you try manually highlighting?</p>
        ) : null}
      </div>
    </div>
  );
};

export { Results };
