import * as React from 'react';

import Reaction from './Reaction';

const ReactionReplies = ({ replies }) => (
  <div className="reaction-replies py-2 d-flex">

    <div className="replies-indent-vline" />

    <div className="flex-grow-1">
      { replies.map(reply => (
        <div key={reply.id} className="pb-2">
          <Reaction reaction={reply} />
        </div>
      )) }
    </div>

  </div>
);

export default ReactionReplies;
