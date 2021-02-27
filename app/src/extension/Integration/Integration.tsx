import React from 'react';

import styled from '@emotion/styled';

import HeaderLogo from 'src/components/domain/HeaderLogo/HeaderLogo';
import Button from 'src/components/elements/Button/Button';
import Fallback from 'src/components/layout/Fallback/Fallback';
import CommentsAreaContainer from 'src/containers/CommentsAreaContainer/CommentsAreaContainer';
import useQueryString from 'src/hooks/use-query-string';
import { color, fontSize, spacing } from 'src/theme';

const CommentsAreaClosedFallback = styled.div`
  font-size: ${fontSize('xlarge')};
  margin-bottom: ${spacing(2)};
`;

const CommentsAreaClosed = () => (
  <Fallback
    when
    fallback={
      <>
        <CommentsAreaClosedFallback>
          L'espace de commentaires n'est pas ouvert sur cette page.
        </CommentsAreaClosedFallback>
        <Button size="large">Demander l'ouverture</Button>
      </>
    }
  />
);

const Container = styled.div`
  border: 1px solid ${color('border')};
  padding: ${spacing(1)};
`;

const Integration: React.FC = () => {
  const { identifier } = useQueryString();

  return (
    <Container>
      <HeaderLogo />
      <CommentsAreaContainer commentsAreaIdentifier={identifier as string} notFoundFallback={<CommentsAreaClosed />} />
    </Container>
  );
};

export default Integration;
