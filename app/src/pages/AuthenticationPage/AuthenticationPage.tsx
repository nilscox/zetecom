import React from 'react';

import styled from '@emotion/styled';
import { useHistory, useLocation } from 'react-router';

import Authentication from 'src/containers/Authentication/Authentication';
import useQueryString from 'src/hooks/use-query-string';
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
  const location = useLocation();
  const { next } = useQueryString(location.search);

  const onAuthenticated = () => {
    if (typeof next === 'string') {
      history.push(next);
    } else {
      history.push('/');
    }
  };

  return (
    <Container>
      <StyledAuthentication onAuthenticated={onAuthenticated} />
    </Container>
  );
};

export default AuthenticationPage;
