import React from 'react';

import styled from '@emotion/styled';

import useDateFormat, { DATE_FORMAT_DAY_HOUR } from 'src/hooks/useDateFormat';
import { fontSize, textColor } from 'src/theme';

type StyledCommentDateProps = {
  edited: boolean;
};

const StyledCommentDate = styled.div<StyledCommentDateProps>`
  font-size: ${fontSize('small')};
  font-style: ${({ edited }) => (edited ? 'italic' : '')};
  color: ${textColor('light')};
`;

type CommentDateProps = {
  date: Date;
  edited: boolean;
};

const CommentDate: React.FC<CommentDateProps> = ({ date, edited }) => {
  const format = useDateFormat(DATE_FORMAT_DAY_HOUR, false);

  return (
    <StyledCommentDate edited={edited}>
      {edited ? '*' : ''} {format(date)}
    </StyledCommentDate>
  );
};

export default CommentDate;
