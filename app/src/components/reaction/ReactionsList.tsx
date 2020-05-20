import React, { Fragment } from 'react';

import { Reaction } from 'src/types/Reaction';

import ReactionContainer from './ReactionContainer';

type ReactionsListProps = {
  reactions: Reaction[];
};

const ReactionsList: React.FC<ReactionsListProps> = ({ reactions }) => {
  if (!reactions.length)
    return null;

  return (
    <div className="reactions-list">
      { reactions.map(reaction => (
        <Fragment key={reaction.id}>
          <ReactionContainer reaction={reaction} />
        </Fragment>
      )) }
    </div>
  );
};

export default ReactionsList;
