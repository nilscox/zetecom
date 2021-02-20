import React from 'react';

import styled from '@emotion/styled';

import useDateFormat, { DATE_FORMAT_DAY_HOUR } from 'src/hooks/useDateFormat';
import { fontSize, textColor } from 'src/theme';

type StyledCommentDateProps = {
  edited: boolean;
  onClick?: () => void;
};

const StyledCommentDate = styled.div<StyledCommentDateProps>`
  font-size: ${fontSize('small')};
  font-style: ${({ edited }) => (edited ? 'italic' : undefined)};
  color: ${textColor('light')};
  cursor: ${({ onClick }) => (onClick ? 'pointer' : undefined)};
`;

type CommentDateProps = {
  date: Date;
  edited: boolean;
  onClick?: () => void;
};

const CommentDate: React.FC<CommentDateProps> = ({ date, edited, onClick }) => {
  const format = useDateFormat(DATE_FORMAT_DAY_HOUR, false);

  return (
    <StyledCommentDate edited={edited} title={onClick ? "Voir l'historique d'édition" : undefined} onClick={onClick}>
      {edited ? '* ' : ''}
      {format(date)}
    </StyledCommentDate>
  );
};

export default CommentDate;
