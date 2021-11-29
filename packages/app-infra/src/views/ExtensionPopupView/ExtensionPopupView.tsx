import React from 'react';

import { selectAuthenticatedUser, selectIsFetchingAuthenticatedUser } from '@zetecom/app-core';
import { Redirect, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import { Authenticated } from '~/components/domain/Authenticated/Authenticated';
import { Header } from '~/components/domain/Header/Header';
import { Tab, TabPanel, Tabs } from '~/components/elements/Tabs/Tabs';
import { Async } from '~/components/layout/Async/Async';
import { Box } from '~/components/layout/Box/Box';
import { useAppSelector } from '~/hooks/useAppSelector';

import { AccountTab } from './AccountTab';
import { AuthenticationTab } from './AuthenticationTab';
import { CommentsTab } from './CommentsTab';
import { ConfigurationTab } from './ConfigurationTab';

export const ExtensionPopupView: React.FC = () => {
  const isFetchingAuthenticatedUser = useAppSelector(selectIsFetchingAuthenticatedUser);

  return (
    <>
      <Box paddingX={3} paddingTop={3}>
        <Header link="/popup" />
      </Box>

      <Async
        loading={isFetchingAuthenticatedUser}
        render={() => (
          <>
            <PopupTabs />
            <PopupContent />
          </>
        )}
      />
    </>
  );
};

const PopupTabs: React.FC = () => {
  const user = useAppSelector(selectAuthenticatedUser);

  const match = useRouteMatch<{ tab: string }>('/popup/:tab');
  const { tab } = match?.params ?? { tab: 'commentaires' };

  const history = useHistory();
  const setTab = (tab: string) => history.push(`/popup/${tab}`);

  return (
    <Tabs>
      <Tab active={tab === 'commentaires'} onClick={() => setTab('commentaires')}>
        Commentaires
      </Tab>

      {!user && (
        <Tab
          active={['connexion', 'inscription', 'lien-de-connexion'].includes(tab)}
          onClick={() => setTab('connexion')}
        >
          Connexion
        </Tab>
      )}

      {user && (
        <Tab active={tab === 'compte'} onClick={() => setTab('compte')}>
          Compte
        </Tab>
      )}

      <Tab active={tab === 'configuration'} onClick={() => setTab('configuration')}>
        Configuration
      </Tab>
    </Tabs>
  );
};

const PopupContent: React.FC = () => (
  <TabPanel padding={4}>
    <Switch>
      <Route path="/popup" exact component={CommentsTab} />
      <Route path="/popup/(connexion|inscription|lien-de-connexion)" component={AuthenticationTab} />
      <Route
        path="/popup/compte"
        render={() => (
          <Authenticated redirect="/popup/connexion">
            <AccountTab />
          </Authenticated>
        )}
      />
      <Route path="/popup/configuration" component={ConfigurationTab} />
      <Route render={() => <Redirect to="/popup" />} />
    </Switch>
  </TabPanel>
);
