/** @jsx jsx */
import React from 'react';

import { jsx } from '@emotion/react';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router';

import HeaderLogo from 'src/components/domain/HeaderLogo/HeaderLogo';
import Box from 'src/components/elements/Box/Box';
import Tabs, { Tab } from 'src/components/elements/Tabs/Tabs';
import { useUser } from 'src/contexts/userContext';

import AuthenticatedView from './AuthenticatedView/AuthenticatedView';
import AuthenticationView from './AuthenticationView/AuthenticationView';
import ConfigurationView from './ConfigurationView/ConfigurationView';
import IntegrationStateView from './IntegrationState/IntegrationState';

const Popup: React.FC = () => {
  const matchIntegrationState = useRouteMatch({ path: '/popup', exact: true });
  const matchAuthentication = useRouteMatch({ path: '/popup/(connexion|inscription|connexion-par-email)' });
  const matchAccount = useRouteMatch({ path: '/popup/compte' });
  const matchConfig = useRouteMatch({ path: '/popup/configuration' });

  const history = useHistory();
  const user = useUser();

  return (
    <Box p={2}>
      <HeaderLogo small link="/popup" />

      <Tabs css={theme => ({ marginTop: theme.spacings[3] })}>
        <Tab selected={Boolean(matchIntegrationState)} onClick={() => history.push('/popup')}>
          Commentaires
        </Tab>

        {user ? (
          <Tab selected={Boolean(matchAccount)} onClick={() => history.push('/popup/compte')}>
            Compte
          </Tab>
        ) : (
          <Tab selected={Boolean(matchAuthentication)} onClick={() => history.push('/popup/connexion')}>
            Connexion
          </Tab>
        )}

        <Tab selected={Boolean(matchConfig)} onClick={() => history.push('/popup/configuration')}>
          Configuration
        </Tab>
      </Tabs>

      <Switch>
        <Route path="/popup/(connexion|inscription|connexion-par-email)" component={AuthenticationView} />
        <Route path="/popup/compte" component={AuthenticatedView} />
        <Route path="/popup/configuration" component={ConfigurationView} />
        <Route path="/popup" exact component={IntegrationStateView} />
      </Switch>
    </Box>
  );
};

export default Popup;
