import React from 'react';

import { Reaction } from 'src/types/Reaction';

import { ReactionContainer } from '../ReactionContainer';

type ReactionsListProps = {
  reactions: Reaction[];
  setAsMain: (reaction: Reaction) => void;
};

export const ReactionsList = (props: ReactionsListProps) => {
  return (
    <div className="reactions-list">
      { props.reactions.map(reaction => (
        <ReactionContainer
          key={reaction.id}
          reaction={reaction}
          setAsMain={props.setAsMain}
        />
      )) }
    </div>
  );
};
