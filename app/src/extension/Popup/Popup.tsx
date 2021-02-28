import React from 'react';

import styled from '@emotion/styled';
import { Redirect, Route, Switch, useHistory } from 'react-router';

import HeaderLogo from 'src/components/domain/HeaderLogo/HeaderLogo';
import Box from 'src/components/elements/Box/Box';
import AuthenticationContainer from 'src/containers/AuthenticationContainer/AuthenticationContainer';
import { useUser } from 'src/contexts/userContext';
import AuthenticatedView from 'src/extension/Popup/AuthenticatedView/AuthenticatedView';
import IntegrationState from 'src/extension/Popup/IntegrationState/IntegrationState';
import { color } from 'src/theme';

const AuthenticationView: React.FC = () => {
  const history = useHistory();
  const user = useUser();

  if (user) {
    return <Redirect to="/popup" />;
  }

  return <AuthenticationContainer onAuthenticated={() => history.push('/popup')} />;
};

const Separator = styled.hr`
  border-style: solid;
  border-color: ${color('border')};
  border-bottom-width: 0;
`;

const Popup: React.FC = () => (
  <Box p={2}>
    <HeaderLogo small link="/popup" />

    <Separator />

    <IntegrationState />

    <Separator />

    <Switch>
      <Route path="/popup/(connexion|inscription|connexion-par-email)" component={AuthenticationView} />
      <Route component={AuthenticatedView} />
    </Switch>
  </Box>
);

export default Popup;
