import React from 'react';

import { Reaction } from '../types/Reaction';

type ReactionFormProps = {
  reaction?: Reaction;
  onSubmit: (reaction: Reaction) => void;
  onClose: () => void;
};

const ReactionForm = (props: ReactionFormProps) => (
  <div style={{ minHeight: 60 }}>
    Reaction form
    <div><button onClick={props.onClose}>Close</button></div>
  </div>
);

export { ReactionForm };
