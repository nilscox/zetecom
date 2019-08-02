import React from 'react';

import MarkdownMessage from 'src/components/common/MarkdownMessage';

type ReactionBodyProps = {
  text: string;
};

const ReactionBody: React.FC<ReactionBodyProps> = ({ text }) => (
  <MarkdownMessage markdown={text} />
);

export default ReactionBody;
