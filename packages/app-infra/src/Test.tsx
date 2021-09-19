import React from 'react';

import { Store } from '@zetecom/app-core';
import { createMemoryHistory, History } from 'history';
import { Provider as ReduxProvider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createStore } from 'redux';

import { ThemeProvider } from './theme/ThemeProvider';
import { configureStore } from './utils/configureStore';

type TestProps = {
  store?: Store;
  history?: History;
};

export const Test: React.FC<TestProps> = ({
  store = configureStore({}),
  history = createMemoryHistory(),
  children,
}) => (
  <ThemeProvider>
    <Router history={history}>
      <ReduxProvider store={store as ReturnType<typeof createStore>}>{children}</ReduxProvider>
    </Router>
  </ThemeProvider>
);
