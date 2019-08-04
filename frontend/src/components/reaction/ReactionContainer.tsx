import React, { useState } from 'react';

import { Reaction } from 'src/types/Reaction';

import ReactionComponent from './Reaction';

type ReactionContainerProps = {
  reaction: Reaction;
};

const ReactionContainer: React.FC<ReactionContainerProps> = ({ reaction }) => {
  const [displayReplies, setDisplayReplies] = useState(false);
  const toggleReplies = () => setDisplayReplies(!displayReplies);

  return (
    <>
      <ReactionComponent reaction={reaction} displayReplies={displayReplies} toggleReplies={toggleReplies} />
    </>
  );
};

export default ReactionContainer;
