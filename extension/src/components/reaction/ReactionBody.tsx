import React, { useContext } from 'react';

import MarkdownMessage from 'src/components/common/MarkdownMessage';
import SearchQueryContext from 'src/utils/SearchQueryContext';

type ReactionBodyProps = {
  text: string;
};

const ReactionBody: React.FC<ReactionBodyProps> = ({ text }) => {
  const searchQuery = useContext(SearchQueryContext);

  return (
    <MarkdownMessage markdown={text} highlight={searchQuery} />
  );
};

export default ReactionBody;
