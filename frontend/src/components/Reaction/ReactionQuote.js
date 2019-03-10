import * as React from 'react';
import PropTypes from 'prop-types';

const ReactionQuote = ({ quote }) => quote && (
  <div className="reaction-quote">
    { quote }
  </div>
);

ReactionQuote.propTypes = {
  quote: PropTypes.string,
};

export default ReactionQuote;
