import React, { useContext } from 'react';

import SearchQueryContext from 'src/utils/SearchQueryContext';

import MarkdownMessage from '../MarkdownMessage';

type ReactionBodyProps = {
  text: string;
};

const ReactionBody: React.FC<ReactionBodyProps> = ({ text }) => {
  const searchQuery = useContext(SearchQueryContext);

  return <MarkdownMessage markdown={text} highlight={searchQuery} />;
};

export default ReactionBody;
