import React, { useState } from 'react';
import ReactModal from 'react-modal';

import { Reaction, ShortReplyType } from '../../types/Reaction';
import { ReactionHeader } from './ReactionHeader';
import { ReactionBody } from './ReactionBody';
import { ReactionFooter } from './ReactionFooter';
import { ReactionHistoryModalContent } from './ReactionHistoryModalContent';

import './ReactionContent.css';

type ReactionContentProps = {
  reaction: Reaction;
  displayReplies: boolean;
  displayReplyForm: boolean;
  toggleReplies: () => void;
  onShowReplyForm: () => void;
};

const ReactionContent = (props: ReactionContentProps) => {
  const [historyModalOpen, setHistoryModalOpen] = useState(false);

  return (
    <div id={`reaction-${props.reaction.id}`} className="reaction">

      <ReactionHeader
        reaction={props.reaction}
        onOpenHistory={() => setHistoryModalOpen(true)}
      />

      <ReactionBody reaction={props.reaction} />

      <ReactionFooter
        reaction={props.reaction}
        displayReplies={props.displayReplies}
        displayReplyForm={props.displayReplyForm}
        toggleReplies={props.toggleReplies}
        onShowReplyForm={props.onShowReplyForm}
      />

      { props.reaction.edited && (
        <ReactModal
          isOpen={historyModalOpen}
          onRequestClose={() => setHistoryModalOpen(false)}
          closeTimeoutMS={200}
        >
          <ReactionHistoryModalContent reaction={props.reaction} />
        </ReactModal>
      ) }

    </div>
  );
};

export { ReactionContent };
