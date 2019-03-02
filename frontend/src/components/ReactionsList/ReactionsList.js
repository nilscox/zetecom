import * as React from 'react';

import { Reaction, ReactionForm } from 'Components';

const ReactionsList = ({ reactions, user, onReactionSubmitted }) => (
  <div className="reactions-list d-flex flex-column">
    { !user && <div>Connectez-vous pour poster une réaction.</div> }
    { user && <ReactionForm author={user} onReactionSubmitted={onReactionSubmitted} /> }

    { reactions.length
      ? reactions.map(r => (
        <div key={r.id} className="my-1">
          <Reaction reaction={r} />
        </div>
      ))
      : <div>Il n'y a pas encore de réaction par rapport à cette information.</div>
    }

  </div>
);

export default ReactionsList;
