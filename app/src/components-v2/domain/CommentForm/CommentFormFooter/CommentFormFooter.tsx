import React from 'react';

import styled from '@emotion/styled';

import Button from 'src/components-v2/elements/Button/Button';

import { CommentFooterContainer } from '../../Comment/CommentFooter/CommentFooter';

const Container = styled(CommentFooterContainer)`
  justify-content: flex-end;
`;

type CommentFormFooterProps = {
  submitting: boolean;
  onSubmit: () => void;
};

const CommentFormFooter: React.FC<CommentFormFooterProps> = ({ submitting, onSubmit }) => {
  return (
    <Container>
      <Button loading={submitting} onClick={onSubmit}>
        Envoyer
      </Button>
    </Container>
  );
};

export default CommentFormFooter;
