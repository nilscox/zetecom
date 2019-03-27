import React from 'react';
import showdown from 'showdown';

import { Reaction } from '../../types/Reaction';

type ReactionBodyProps = {
  reaction: Reaction;
};

const converter = new showdown.Converter({ tables: true });

const ReactionBody = (props: ReactionBodyProps) => {
  const { reaction } = props;
  const html = converter.makeHtml(reaction.text);

  return (
    <div>
      { reaction.quote && (
        <div className="reaction-quote">{ reaction.quote }</div>
      ) }
      <div className="reaction-text markdown-body" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
};

export { ReactionBody };
