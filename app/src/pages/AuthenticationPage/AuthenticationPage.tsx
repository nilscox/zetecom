import React from 'react';

import styled from '@emotion/styled';
import { useHistory } from 'react-router';

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
  const history = useHistory();

  const onAuthenticated = () => {
    history.push('/');
  };

  return (
    <Container>
      <StyledAuthentication onAuthenticated={onAuthenticated} />
    </Container>
  );
};

export default AuthenticationPage;
