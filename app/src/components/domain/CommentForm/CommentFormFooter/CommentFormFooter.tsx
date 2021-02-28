import React from 'react';

import styled from '@emotion/styled';

import Button from 'src/components/elements/Button/Button';

import { CommentFooterContainer } from '../../Comment/CommentFooter/CommentFooter';

const Container = styled(CommentFooterContainer)`
  justify-content: flex-end;
`;

type CommentFormFooterProps = {
  submitting: boolean;
  canSubmit: boolean;
};

const CommentFormFooter: React.FC<CommentFormFooterProps> = ({ submitting, canSubmit }) => (
  <Container>
    <Button type="submit" disabled={!canSubmit} loading={submitting}>
      Envoyer
    </Button>
  </Container>
);

export default CommentFormFooter;
