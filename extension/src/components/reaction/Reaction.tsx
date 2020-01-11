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
  onEdit?: () => void;
  onViewHistory: () => void;
  onReport: () => void;
};

const ReactionComponent: React.FC<ReactionProps> = ({
  reaction,
  displayReplies,
  toggleReplies,
  displayReplyForm,
  onReply,
  onEdit,
  onViewHistory,
  onReport,
}) => {
  const { colors: { border }, borderRadius } = useTheme();

  return (
    <div id={`reaction-${reaction.id}`} style={{ border: `1px solid ${border}`, borderRadius }}>
      <ReactionHeader {...reaction} onEdit={onEdit} onViewHistory={onViewHistory} onReport={onReport} />
      <ReactionBody {...reaction} />
      <ReactionFooter
        reaction={reaction}
        displayReplies={displayReplies}
        toggleReplies={toggleReplies}
        displayReplyForm={displayReplyForm}
        onReply={onReply}
      />
    </div>
  );
};

export default ReactionComponent;
