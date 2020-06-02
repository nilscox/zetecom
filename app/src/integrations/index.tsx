import React from 'react';

import { Route, RouteComponentProps, Switch } from 'react-router-dom';

import AsyncContent from 'src/components/AsyncContent';
import { UserProvider, useUserContext } from 'src/utils/UserContext';

import { createTheme } from './createTheme';
import Integration from './Integration';
import ReactionHistoryPopup from './popups/ReactionHistoryPopup';
import ReportPopup from './popups/ReportPopup';

import { CssBaseline, ThemeProvider } from '@material-ui/core';

const theme = createTheme();

const Integrations: React.FC<RouteComponentProps> = () => {
  const [user, setUser] = useUserContext();

  return (
    <ThemeProvider theme={theme}>

      <CssBaseline />

      <AsyncContent
        loading={user === undefined}
        content={() => (
          <UserProvider value={{ user, setUser }}>
            <Switch>
              <Route path="/integration" exact component={Integration} />
              <Route path="/integration/reaction/:id/history" exact component={ReactionHistoryPopup} />
              <Route path="/integration/reaction/:id/report" exact component={ReportPopup} />
            </Switch>
          </UserProvider>
        )}
      />

    </ThemeProvider>
  );
};

export default Integrations;
