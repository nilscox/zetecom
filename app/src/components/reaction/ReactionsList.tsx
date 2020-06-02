import React from 'react';

import { Reaction } from 'src/types/Reaction';

import Padding from '../Padding';

import ReactionContainer from './ReactionContainer';

type ReactionsListProps = {
  reactions: Reaction[];
};

const ReactionsList: React.FC<ReactionsListProps> = ({ reactions }) => {
  if (!reactions.length)
    return null;

  return (
    <div className="reactions-list">
      { reactions.map((reaction, n) => (
        <Padding key={reaction.id} top when={n > 0}>
          <ReactionContainer reaction={reaction} />
        </Padding>
      )) }
    </div>
  );
};

export default ReactionsList;
