import React from 'react';
import ReactDOM from 'react-dom';

import { ThemeProvider } from '@emotion/react';
import { Store } from '@zetecom/app-core';
import { Demo as DemoType, Demos, DemosGroup } from 'demo';
import { createMemoryHistory, History } from 'history';
import { Provider as ReduxProvider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createStore } from 'redux';

import { ReactRouterGateway } from '~/gateways/ReactRouterGateway';
import { EntitiesContainers, StubDependencies, stubDependencies } from '~/gateways/stubs';
import { theme } from '~/theme';
import { GlobalStyles } from '~/theme/GlobalStyles';
import { configureStore } from '~/utils/configureStore';

import './zetecom-global';

import { componentsDemos } from './components/demos';
import { guidelines } from './guidelines';
import * as themeDemos from './theme/theme.demos';
import { getEnv } from './utils/env';
import { viewsDemos } from './views/demos';

import 'demo/lib/styles.css';

type DemoDependencies = {
  store: Store;
  deps: StubDependencies;
  containers: EntitiesContainers;
  history: History;
};

const getDependencies = (): DemoDependencies => {
  const containers = new EntitiesContainers({ commentsAreas: [], users: [] });
  const history = createMemoryHistory();

  const deps = stubDependencies(containers);

  // TODO: override dependencies per demo
  deps.routerGateway = new ReactRouterGateway(history);

  const store = configureStore(deps);

  for (const dep of Object.values(deps)) {
    dep.getState = store.getState.bind(store);
  }

  return { store, deps, containers, history };
};

const Wrapper: React.FC<DemoDependencies> = ({ store, history, children }) => (
  <Router history={history}>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ReduxProvider store={store as ReturnType<typeof createStore>}>{children}</ReduxProvider>
    </ThemeProvider>
  </Router>
);

export type Demo = DemoType<DemoDependencies>;

const demos: DemosGroup<DemoDependencies> = {
  ...componentsDemos,
  ...viewsDemos,
  theme: themeDemos,
  Guidelines: { guidelines },
};

ReactDOM.render(
  <Demos
    basename={getEnv('BASENAME')}
    title="Zétécom components library"
    demos={demos}
    getDependencies={getDependencies}
    Wrapper={Wrapper}
  />,
  document.getElementById('root'),
);
