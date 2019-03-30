import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import moment from 'moment';

import { Reaction, ReactionHistory } from '../../types/Reaction';
import { fetchReaction } from '../../fetch/fetchReactions';
import { Loader } from '../Loader';

type ReactionHistoryModalProps = {
  isOpen: boolean;
  reaction: Reaction;
  onRequestClose: () => void;
};

export const ReactionHistoryModal = (props: ReactionHistoryModalProps) => {
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

  return (
    <ReactModal
      isOpen={props.isOpen}
      onRequestClose={props.onRequestClose}
      closeTimeoutMS={200}
    >
      { history.map(h => (
        <div key={h.date.toString()} className="history-message">
          <div>Date : { moment(h.date).format('[Le] Do MMMM YYYY [à] hh:mm') }</div>
          <div>Text : { h.text }</div>
        </div>
      )) }
    </ReactModal>
  );
};
