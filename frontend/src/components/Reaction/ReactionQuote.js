import * as React from 'react';

const ReactionQuote = ({ quote }) => quote && (
  <div className="reaction-quote">
    { quote }
  </div>
);

export default ReactionQuote;
