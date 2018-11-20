import React from 'react';
import Linkify from 'react-linkify';

const ReactionMessage = ({ message }) => (
  <div className="reaction-message p-2">

    { message.split('\n\n').map((p, n) => (
      <p key={n}>

        { p.split('\n').map((l, n) => (
          <span key={n}>
            <Linkify properties={{ target: '_blank' }}>
              { l }
            </Linkify>
            <br />
          </span>
        )) }

      </p>
    )) }

  </div>
);

export default ReactionMessage;
