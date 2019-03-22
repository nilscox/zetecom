import React from 'react';

import { Reaction } from '../../types/Reaction';

type ReactionBodyProps = {
  reaction: Reaction;
};

const ReactionBody = (props: ReactionBodyProps) => {
  const { reaction } = props;

  return (
    <div>
      { reaction.quote && (
        <div className="reaction-quote">{ reaction.quote }</div>
      ) }
      <div className="reaction-text">{ reaction.text }</div>
    </div>
  );
};

export { ReactionBody };
