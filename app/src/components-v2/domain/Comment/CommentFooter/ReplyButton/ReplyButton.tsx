import React from 'react';

import styled from '@emotion/styled';

import Button from '../../../../elements/Button/Button';

const StyledButton = styled(Button)`
  border-radius: unset;
`;

type ReplyButtonProps = {
  isReplyFormOpen: boolean;
  onClick: () => void;
};

const ReplyButton: React.FC<ReplyButtonProps> = ({ isReplyFormOpen, onClick }) => {
  return (
    <StyledButton disabled={isReplyFormOpen} onClick={onClick}>
      Répondre
    </StyledButton>
  );
};

export default ReplyButton;
