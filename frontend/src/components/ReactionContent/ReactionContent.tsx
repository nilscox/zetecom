import React, { useState } from 'react';
import ReactModal from 'react-modal';

import { Reaction, ShortReplyType } from '../../types/Reaction';
import { ReactionHeader } from './ReactionHeader';
import { ReactionBody } from './ReactionBody';
import { ReactionFooter } from './ReactionFooter';
import { ReactionHistoryModalContent } from './ReactionHistoryModalContent';
import { ReactionForm } from '../ReactionForm';

import './ReactionContent.css';

type ReactionContentProps = {
  reaction: Reaction;
  displayReplies: boolean;
  displayReplyForm: boolean;
  toggleReplies: () => void;
  onShowReplyForm: () => void;
  onReactionUpdated: (reaction: Reaction) => void;
};

const ReactionContent = (props: ReactionContentProps) => {
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [edittingReaction, setEdittingReaction] = useState(false);

  if (edittingReaction) {
    const onReactionSubmitted = (reaction: Reaction) => {
      props.onReactionUpdated(reaction);
      setEdittingReaction(false);
    };

    return (
      <ReactionForm
        preloadedReaction={props.reaction}
        onSubmitted={onReactionSubmitted}
        onClose={() => setEdittingReaction(false)}
      />
    );
  }

  return (
    <div id={`reaction-${props.reaction.id}`} className="reaction">

      <ReactionHeader
        reaction={props.reaction}
        onOpenHistory={() => setHistoryModalOpen(true)}
        onEditReaction={() => setEdittingReaction(true)}
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
