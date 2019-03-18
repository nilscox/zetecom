import React from 'react';

import { Reaction } from '../../types/Reaction';
import { ReactionHeader } from './ReactionHeader';
import { ReactionBody } from './ReactionBody';
import { ReactionFooter } from './ReactionFooter';

type ReactionContentProps = {
  reaction: Reaction;
  replyFormDisplayed: boolean;
  toggleReplies: () => void;
  setAsMain: () => void;
  displayReplyForm: () => void;
};

const ReactionContent = (props: ReactionContentProps) => (
  <div id={`reaction-${props.reaction.id}`} className="reaction">
    <ReactionHeader reaction={props.reaction} setAsMain={props.setAsMain} />
    <ReactionBody reaction={props.reaction} />
    <ReactionFooter
      reaction={props.reaction}
      toggleReplies={props.toggleReplies}
      displayReplyForm={props.displayReplyForm}
    />
  </div>
);

export { ReactionContent };
