import React from 'react';

import styled from '@emotion/styled';

import Button from '../../../../elements/Button/Button';

const StyledButton = styled(Button)`
  border-radius: unset;
`;

type ReplyButtonProps = {
  isReplyFormOpen: boolean;
  authorNick: string;
  onClick: () => void;
};

const ReplyButton: React.FC<ReplyButtonProps> = ({ isReplyFormOpen, authorNick, onClick }) => {
  return (
    <StyledButton disabled={isReplyFormOpen} title={`Répondre à ${authorNick}`} onClick={onClick}>
      Répondre
    </StyledButton>
  );
};

export default ReplyButton;
