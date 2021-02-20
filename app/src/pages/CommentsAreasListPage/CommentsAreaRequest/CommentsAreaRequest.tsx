import React, { useRef, useState } from 'react';

import styled from '@emotion/styled';

import CommentsAreaForm, { CommentsAreaFormState } from 'src/components/domain/CommentsAreaForm/CommentAreaForm';
import Button from 'src/components/elements/Button/Button';
import Collapse from 'src/components/layout/Collapse/Collapse';
import Fade from 'src/components/layout/Fade/Fade';
import { spacing } from 'src/theme';

const Container = styled.div<{ minHeight: number }>`
  min-height: ${props => props.minHeight}px;
  margin: ${spacing(4, 0)};
  position: relative;
`;

const CommentsAreaRequest: React.FC = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [displayForm, setDisplayForm] = useState(false);

  const handleSubmit = (values: CommentsAreaFormState) => {};

  return (
    <Container minHeight={buttonRef.current?.clientHeight ?? 0}>
      <Fade in={!displayForm}>
        <Button ref={buttonRef} size="large" onClick={() => setDisplayForm(true)} style={{ position: 'absolute' }}>
          Ouvrir une zone de commentaires
        </Button>
      </Fade>

      <Collapse in={displayForm}>
        <CommentsAreaForm
          fieldErrors={{}}
          clearFieldError={() => {}}
          onCancel={() => setDisplayForm(false)}
          onSubmit={handleSubmit}
        />
      </Collapse>
    </Container>
  );
};

export default CommentsAreaRequest;
