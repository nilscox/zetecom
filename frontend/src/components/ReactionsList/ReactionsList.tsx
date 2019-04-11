import React, { useContext, useEffect, useRef, useState } from 'react';

import { Reaction, QuickReactionType, ReactionLabel } from '../../types/Reaction';
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
