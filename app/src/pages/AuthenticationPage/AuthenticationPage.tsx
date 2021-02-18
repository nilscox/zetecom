import React from 'react';

import styled from '@emotion/styled';

import Authentication from 'src/containers/Authentication/Authentication';
import { domain } from 'src/theme';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const StyledAuthentication = styled(Authentication)`
  margin: ${domain('authenticationFormMargin')} 0;
`;

const AuthenticationPage: React.FC = () => {
  return (
    <Container>
      <StyledAuthentication />
    </Container>
  );
};

export default AuthenticationPage;
