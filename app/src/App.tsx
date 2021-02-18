import React from 'react';

import { ThemeProvider } from '@emotion/react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import ToastContainer from 'src/components/layout/ToastContainer/ToastContainer';
import { UserProvider } from 'src/contexts/user';
import Pages from 'src/pages/Pages';
import theme from 'src/theme';
import { GlobalStyles } from 'src/theme/GlobalStyles';

const Router: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route component={Pages} />
    </Switch>
  </BrowserRouter>
);

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <ToastContainer />
    <UserProvider>
      <Router />
    </UserProvider>
  </ThemeProvider>
);

export default App;
