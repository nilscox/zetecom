import React, { useState } from 'react';

import { Reaction, ReactionLabel } from '../types/Reaction';

type ReactionFormProps = {
  reaction?: Reaction;
  onSubmit: (label: ReactionLabel, quote: string | null, text: string) => void;
  onClose: () => void;
};

const ReactionForm = (props: ReactionFormProps) => {
  const { reaction } = props;
  const [text, setText] = useState(reaction ? reaction.text : null);
  const [quote, setQuote] = useState(reaction ? reaction.quote : null);
  const [label, setLabel] = useState(reaction ? reaction.label : null);

  const handleSubmit = () => {
    if (!label)
      alert('missing label');
    else if (!text)
      alert('missing text');
    else
      props.onSubmit(label, quote, text);
  };

  return (
    <div style={{ minHeight: 60 }}>

      <input type="text" value={quote || ''} onChange={e => setQuote(e.target.value)} />

      <textarea style={{ width: '100%' }} value={text || ''} onChange={e => setText(e.target.value)} />

      <select value={label || ''} onChange={e => setLabel(e.target.value as ReactionLabel)}>
        <option value="SOURCE">Source</option>
        <option value="METHOD">Méthode</option>
      </select>

      <div>
        <button onClick={props.onClose}>Close</button>
        <button onClick={handleSubmit}>Submit</button>
      </div>

    </div>
  );
};

export { ReactionForm };
