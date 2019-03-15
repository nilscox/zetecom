import * as React from 'react';
import PropTypes from 'prop-types';

import { Reaction as ReactionType } from 'Types';

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

ReactionReplies.propTypes = {
  replies: PropTypes.arrayOf(PropTypes.instanceOf(ReactionType)),
};

export default ReactionReplies;
