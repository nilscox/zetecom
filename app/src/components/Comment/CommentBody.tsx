import React, { useContext } from 'react';

import SearchQueryContext from 'src/contexts/SearchQueryContext';

import MarkdownMessage from '../MarkdownMessage';

type CommentBodyProps = {
  text: string;
};

const CommentBody: React.FC<CommentBodyProps> = ({ text }) => {
  const searchQuery = useContext(SearchQueryContext);

  return <MarkdownMessage markdown={text} highlight={searchQuery} />;
};

export default CommentBody;
