import React from 'react';

import { Reaction } from '../../types/Reaction';

type ReactionFooterProps = {
  reaction: Reaction;
  toggleReplies: () => void;
  displayReplyForm: () => void;
};

const ReactionFooter = (props: ReactionFooterProps) => (
  <div />
);

export { ReactionFooter };
