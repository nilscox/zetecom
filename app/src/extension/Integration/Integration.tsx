import React from 'react';

import styled from '@emotion/styled';

import HeaderLogo from 'src/components/domain/HeaderLogo/HeaderLogo';
import CommentsAreaContainer from 'src/containers/CommentsAreaContainer/CommentsAreaContainer';
import useQueryString from 'src/hooks/use-query-string';
import { color, spacing } from 'src/theme';

const Container = styled.div`
  border: 1px solid ${color('border')};
  padding: ${spacing(1)};
`;

const Integration: React.FC = () => {
  const { identifier } = useQueryString();

  return (
    <Container>
      <HeaderLogo />
      <CommentsAreaContainer commentsAreaIdentifier={identifier as string} />
    </Container>
  );
};

export default Integration;
