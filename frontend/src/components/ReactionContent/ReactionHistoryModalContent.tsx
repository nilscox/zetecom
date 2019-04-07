import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import moment from 'moment';
import showdown from 'showdown';

import { classList } from '../../utils/classList';
import { Reaction, ReactionHistory } from '../../types/Reaction';
import { fetchReaction } from '../../fetch/fetchReactions';
import { Loader } from '../Loader';

const converter = new showdown.Converter();

type ReactionHistoryModalContentProps = {
  reaction: Reaction;
};

export const ReactionHistoryModalContent = (props: ReactionHistoryModalContentProps) => {
  const [history, setHistory] = useState<ReactionHistory[]>(undefined);
  const [fetchingHistory, setFetchingHistory] = useState(false);

  useEffect(() => {
    if (fetchingHistory || history)
      return;

    fetchReaction(props.reaction.id)
      .then((reaction: Reaction) => {
        setHistory(reaction.history);
        setFetchingHistory(false);
      });
  });

  if (fetchingHistory || !history)
    return <Loader size="medium" />;

  const getHistory = () => {
    if (!props.reaction.edited)
      return [...history].reverse();

    return [
      { date: props.reaction.edited, text: props.reaction.text },
      ...[...history].reverse(),
    ];
  }

  return (
    <div>
      { getHistory().map(({ date, text }, n) => (
        <div key={date.toString()} className={classList('history-message', n === 0 && 'history-current-message')}>
          <div className="history-message-date-wrapper">
            <div className={`history-message-date-filler${n !== 0 ? '-left' : ''}`} />
            <div className="history-message-date">{ moment(date).format('[Le] Do MMMM YYYY [à] hh:mm') }</div>
            <div className="history-message-date-filler" />
          </div>
          <div className="history-message-text markdown-body" dangerouslySetInnerHTML={{ __html: converter.makeHtml(text) }} />
        </div>
      )) }
    </div>
  );
};
