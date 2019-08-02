import React from 'react';

import { Reaction } from 'src/types/Reaction';

import ReactionContainer from './ReactionContainer';

type ReactionsListProps = {
  reactions: Reaction[];
};

const ReactionsList: React.FC<ReactionsListProps> = ({ reactions }) => (
  <>
    { reactions.map(r => <ReactionContainer key={r.id} reaction={r} />) }
  </>
);

export default ReactionsList;
