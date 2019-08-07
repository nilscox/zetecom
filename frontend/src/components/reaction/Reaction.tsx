import React from 'react';

import { Reaction } from 'src/types/Reaction';
import { useTheme } from 'src/utils/Theme';

import ReactionHeader from './ReactionHeader';
import ReactionBody from './ReactionBody';
import ReactionFooter from './ReactionFooter';

type ReactionProps = {
  reaction: Reaction;
  displayReplies: boolean;
  toggleReplies: () => void | null;
  displayReplyForm: boolean;
  onReply: () => void;
};

const ReactionComponent: React.FC<ReactionProps> = ({
  reaction,
  displayReplies,
  toggleReplies,
  displayReplyForm,
  onReply,
}) => {
  const { colors: { border }, borderRadius } = useTheme();

  return (
    <div id={`reaction-${reaction.id}`} style={{ border: `1px solid ${border}`, borderRadius }}>
      <ReactionHeader {...reaction} />
      <ReactionBody {...reaction} />
      <ReactionFooter
        {...reaction}
        displayReplies={displayReplies}
        toggleReplies={toggleReplies}
        displayReplyForm={displayReplyForm}
        onReply={onReply}
      />
    </div>
  );
};

export default ReactionComponent;
