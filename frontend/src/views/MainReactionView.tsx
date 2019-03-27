import React from 'react';

import { Reaction } from '../types/Reaction';
import { ReactionContainer } from '../components/ReactionContainer';

type MainReactionViewProps = {
  reaction: Reaction;
  setAsMain: (reaction?: Reaction) => void;
};

const MainReactionView = (props: MainReactionViewProps) => {
  return (
    <div>

      <ReactionContainer
        reaction={props.reaction}
        setAsMain={props.setAsMain}
      />

    </div>
  );
};

export { MainReactionView };
