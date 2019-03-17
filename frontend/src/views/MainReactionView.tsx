import React from 'react';

import { Reaction } from '../types/Reaction';
import { ReactionWrapper } from '../components/ReactionsList';

type MainReactionViewProps = {
  reaction: Reaction;
  setAsMain: (reaction?: Reaction) => void;
};

const MainReactionView = (props: MainReactionViewProps) => {
  return (
    <div>

      <ReactionWrapper
        reaction={props.reaction}
        setAsMain={props.setAsMain}
      />

    </div>
  );
};

export { MainReactionView };
