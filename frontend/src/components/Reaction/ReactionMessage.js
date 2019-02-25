import * as React from 'react';

const ReactionMessage = ({ children: text }) => {
  const renderLine = (l, n) => <span key={n}>{ l }<br /></span>;
  const renderParagraph = (p, n) => <p key={n}>{ p.split('\n').map(renderLine) }</p>;

  return <div className="reaction-message p-2">{ text.split('\n\n').map(renderParagraph) }</div>;
}

export default ReactionMessage;
