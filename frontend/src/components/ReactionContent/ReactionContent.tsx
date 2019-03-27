import React from 'react';

import { Reaction, ShortReplyType } from '../../types/Reaction';
import { ReactionHeader } from './ReactionHeader';
import { ReactionBody } from './ReactionBody';
import { ReactionFooter } from './ReactionFooter';

import './ReactionContent.css';

type ReactionContentProps = {
  reaction: Reaction;
  displayReplies: boolean;
  displayReplyForm: boolean;
  toggleReplies: () => void;
  onShowReplyForm: () => void;
};

const ReactionContent = (props: ReactionContentProps) => (
  <div id={`reaction-${props.reaction.id}`} className="reaction">
    <ReactionHeader reaction={props.reaction} />
    <ReactionBody reaction={props.reaction} />
    <ReactionFooter
      reaction={props.reaction}
      displayReplies={props.displayReplies}
      displayReplyForm={props.displayReplyForm}
      toggleReplies={props.toggleReplies}
      onShowReplyForm={props.onShowReplyForm}
    />
  </div>
);

export { ReactionContent };
