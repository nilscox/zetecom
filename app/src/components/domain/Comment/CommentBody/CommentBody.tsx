import React from 'react';

import styled from '@emotion/styled';

import { useSearchQuery } from 'src/contexts/searchQueryContext';
import { domain, spacing } from 'src/theme';

import Markdown from '../../../elements/Markdown/Markdown';

const StyledMarkdown = styled(Markdown)`
  padding: ${spacing(2, 1)};

  .highlighted {
    background-color: ${domain('searchHighlightBackground')};
  }
`;

type CommentBodyProps = { text: string };

const CommentBody: React.FC<CommentBodyProps> = ({ text }) => {
  const searchQuery = useSearchQuery();

  return <StyledMarkdown markdown={text} highlight={searchQuery} />;
};

export default CommentBody;
