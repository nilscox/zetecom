import React from 'react';

import { ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import ToastContainer from 'src/components/layout/ToastContainer/ToastContainer';
import { UserProvider } from 'src/contexts/userContext';
import Integration from 'src/extension/Integration/Integration';
import Pages from 'src/pages/Pages';
import Popups from 'src/popups/Popups';
import theme from 'src/theme';
import { GlobalStyles } from 'src/theme/GlobalStyles';

const Router: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/integration" exact component={Integration} />
      <Route path="/commentaire/:id/(signaler|historique)" component={Popups} />
      <Route component={Pages} />
    </Switch>
  </BrowserRouter>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ToastContainer />
      <UserProvider>
        <Router />
      </UserProvider>
    </ThemeProvider>
    {/* <ReactQueryDevtools initialIsOpen /> */}
  </QueryClientProvider>
);

export default App;
