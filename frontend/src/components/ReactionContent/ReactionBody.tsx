import React, { useRef, useState, useEffect } from 'react';
import showdown from 'showdown';

import { Reaction } from '../../types/Reaction';
import { classList } from '../../utils/classList';
import { ExpandType } from './ReactionContent';

type ReactionBodyProps = {
  reaction: Reaction;
  expand: ExpandType;
  expandFull: () => void;
};

const converter = new showdown.Converter({ tables: true });

const ReactionBody = (props: ReactionBodyProps) => {
  const [canExpand, setCanExpand] = useState(false);
  const { reaction, expand, expandFull } = props;
  const html = converter.makeHtml(reaction.text);
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current && textRef.current.clientHeight > 240)
      setCanExpand(true);

    if (expand === 'fold')
      setCanExpand(true);
  }, [textRef.current, expand]);

  return (
    <div className={
      classList(
        'reaction-body',
        reaction.quote && 'has-quote',
        canExpand && 'can-expand',
        `expand-type--${expand}`,
      )
    }>
      { reaction.quote && expand !== 'fold' && (
        <div className="reaction-quote">{ reaction.quote }</div>
      ) }
      <div
        className="reaction-text markdown-github"
        dangerouslySetInnerHTML={{ __html: html }}
        ref={textRef}
      />

      { expand !== 'full' && <div className="show-more" onClick={expandFull} /> }

    </div>
  );
};

export { ReactionBody };
