import React from 'react';

import { Reaction } from 'src/types/Reaction';

import ReactionComponent from './Reaction';

type ReactionContainerProps = {
  reaction: Reaction;
};

const ReactionContainer: React.FC<ReactionContainerProps> = ({ reaction }) => (
  <>
    <ReactionComponent reaction={reaction} />
  </>
);

export default ReactionContainer;
