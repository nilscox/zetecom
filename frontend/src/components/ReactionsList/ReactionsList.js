import * as React from 'react';

import { UserConsumer } from 'Contexts';
import { Reaction, ReactionForm } from 'Components';

const ReactionsList = ({ reactions, onReactionSubmitted }) => (
  <UserConsumer>
  { user => (
    <div className="reactions-list d-flex flex-column">
      { !user && <div className="p-4 lead text-muted text-center"><a href="#">Connectez-vous</a> pour poster une réaction.</div> }
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
  ) }
  </UserConsumer>
);

export default ReactionsList;
