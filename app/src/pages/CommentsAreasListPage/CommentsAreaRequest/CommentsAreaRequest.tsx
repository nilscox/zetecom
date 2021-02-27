import React, { useCallback, useRef, useState } from 'react';

import styled from '@emotion/styled';

import Button from 'src/components/elements/Button/Button';
import Collapse from 'src/components/layout/Collapse/Collapse';
import Fade from 'src/components/layout/Fade/Fade';
import CommentsAreaFormContainer from 'src/containers/CommentsAreaFormContainer/CommentsAreaFormContainer';
import { useUser } from 'src/contexts/userContext';
import { spacing } from 'src/theme';

const Container = styled.div<{ minHeight: number }>`
  min-height: ${props => props.minHeight}px;
  margin: ${spacing(4, 0)};
  position: relative;
`;

const CommentsAreaRequest: React.FC = () => {
  const user = useUser();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [displayForm, setDisplayForm] = useState(false);

  const handleSuccess = useCallback(() => {
    setDisplayForm(false);
  }, []);

  if (!user) {
    return null;
  }

  return (
    <Container minHeight={buttonRef.current?.clientHeight ?? 0}>
      <Fade in={!displayForm}>
        <Button ref={buttonRef} size="large" onClick={() => setDisplayForm(true)} style={{ position: 'absolute' }}>
          Ouvrir une zone de commentaires
        </Button>
      </Fade>

      <Collapse in={displayForm}>
        <CommentsAreaFormContainer type="request" onCancel={() => setDisplayForm(false)} onSuccess={handleSuccess} />
      </Collapse>
    </Container>
  );
};

export default CommentsAreaRequest;
