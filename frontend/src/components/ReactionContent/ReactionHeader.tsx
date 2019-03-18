import React from 'react';

import { Reaction } from '../../types/Reaction';

type ReactionHeaderProps = {
  reaction: Reaction;
  setAsMain: (reaction: Reaction) => void;
};

const ReactionHeader = (props: ReactionHeaderProps) => (
  <div />
);

export { ReactionHeader };
