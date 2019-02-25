import * as React from 'react';

import { Reaction } from 'Components';

const ReactionsList = ({ reactions }) => (
  <div className="reactions-list d-flex flex-column">
    { reactions.length
      ? reactions.map(r => (
        <div key={r.id} className="my-1">
          <Reaction reaction={r} />
        </div>
      ))
      : 'Il n\'y a pas encore de réaction par rapport à cette information.'
    }
  </div>
);

export default ReactionsList;
