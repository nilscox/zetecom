import React from 'react';

import { Reaction } from '../types/Reaction';

type ReactionContentProps = {
  reaction: Reaction;
  replyFormDisplayed: boolean;
  toggleReplies: () => void;
  setAsMain: () => void;
  displayReplyForm: () => void;
};

const ReactionContent = (props: ReactionContentProps) => (
  <div id={`reaction-${props.reaction.id}`} className="reaction" style={{ padding: 40 }}>
    <h3 style={{ fontSize: 20, fontWeight: 'bold' }}>Reaction #{props.reaction.id}</h3>
    <hr />
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <button onClick={props.toggleReplies}>Toggle replies</button>
      <button onClick={props.setAsMain}>Set as main</button>
      <button onClick={props.displayReplyForm}>Display reply form</button>
    </div>
  </div>
);

export { ReactionContent };
