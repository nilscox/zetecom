import React from 'react';

import styled from '@emotion/styled';

import Button from 'src/components-v2/elements/Button/Button';

import { CommentFooterContainer } from '../../Comment/CommentFooter/CommentFooter';

const Container = styled(CommentFooterContainer)`
  justify-content: flex-end;
`;

type CommentFormFooterProps = {
  submitting: boolean;
};

const CommentFormFooter: React.FC<CommentFormFooterProps> = ({ submitting }) => {
  return (
    <Container>
      <Button type="submit" loading={submitting}>
        Envoyer
      </Button>
    </Container>
  );
};

export default CommentFormFooter;
