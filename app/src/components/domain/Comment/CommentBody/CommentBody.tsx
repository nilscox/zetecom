import React from 'react';

import styled from '@emotion/styled';

import { spacing } from 'src/theme';

import Markdown from '../../../elements/Markdown/Markdown';

const StyledMarkdown = styled(Markdown)`
  padding: ${spacing(2, 1)};
`;

type CommentBodyProps = { text: string };

const CommentBody: React.FC<CommentBodyProps> = ({ text }) => {
  return <StyledMarkdown markdown={text} />;
};

export default CommentBody;
