import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { Dependencies, initialize } from '@zetecom/app-core';
import { createBrowserHistory, History } from 'history';
import { Provider as ReduxProvider, useDispatch } from 'react-redux';
import { Router, useLocation, useRouteMatch } from 'react-router-dom';
import { Store } from 'redux';

import './zetecom-global';

import { NotificationContainer } from './components/elements/NotificationContainer/NotificationContainer';
import { DependenciesProvider } from './dependencies.provider';
import { FetchHttpAdapter } from './gateways/adapters/HttpAdapter';
import { HTTPCommentGateway } from './gateways/HTTPCommentGateway';
import { HTTPCommentsAreaGateway } from './gateways/HTTPCommentsAreaGateway';
import { HTTPUserGateway } from './gateways/HTTPUserGateway';
import { MatomoTrackingGateway } from './gateways/MatomoTrackingGateway';
import { ReactRouterGateway } from './gateways/ReactRouterGateway';
import { RealDateGateway } from './gateways/RealDateGateway';
import { RealExtensionGateway } from './gateways/RealExtensionGateway';
import { RealTimerGateway } from './gateways/RealTimerGateway';
import { StubTrackingGateway } from './gateways/stubs/StubTrackingGateway';
import { ToastifyNotificationGateway } from './gateways/ToastifyNotificationGateway';
import { GlobalStyles } from './theme/GlobalStyles';
import { ThemeProvider } from './theme/ThemeProvider';
import { configureStore } from './utils/configureStore';
import { demoStore } from './utils/demoStore';
import { getEnv } from './utils/env';
import { Views } from './views';

const createStore = (history: History): [Dependencies, Store] => {
  if (getEnv('DEMO') === 'true') {
    return demoStore(history);
  }

  // there is a default value in webpack config
  const http = new FetchHttpAdapter(getEnv('API_URL') as string);

  const getTrackingGateway = () => {
    const analyticsUrl = getEnv('ANALYTICS_URL') as string;
    const analyticsSiteId = getEnv('ANALYTICS_SITE_ID') as string;

    if (analyticsSiteId === 'stub') {
      return new StubTrackingGateway();
    }

    return new MatomoTrackingGateway(analyticsUrl, Number(analyticsSiteId));
  };

  const dependencies = {
    commentsAreaGateway: new HTTPCommentsAreaGateway(http),
    commentGateway: new HTTPCommentGateway(http),
    userGateway: new HTTPUserGateway(http),
    notificationGateway: new ToastifyNotificationGateway(),
    extensionGateway: new RealExtensionGateway(history),
    routerGateway: new ReactRouterGateway(history),
    dateGateway: new RealDateGateway(),
    timerGateway: new RealTimerGateway(),
    trackingGateway: getTrackingGateway(),
  };

  const store = configureStore(dependencies);

  return [dependencies, store];
};

const history = createBrowserHistory({
  basename: getEnv('BASENAME'),
});

const [dependencies, store] = createStore(history);

const useInitialization = () => {
  const dispatch = useDispatch();

  // prevent rendering before isFetchingAuthenticatedUser is true
  // to avoid being redirect by the <Authenticated /> component
  const [render, setRender] = useState(false);

  useEffect(() => {
    dispatch(initialize());
    setRender(true);
  }, []);

  return render;
};

const useTrackPageViews = () => {
  const location = useLocation();
  const matchIntegration = useRouteMatch('/integration/:identifier');

  useEffect(() => {
    if (!matchIntegration) {
      dependencies.trackingGateway.pageView();
    }
  }, [location, matchIntegration]);
};

const App: React.FC = () => {
  const render = useInitialization();

  useTrackPageViews();

  if (!render) {
    return null;
  }

  return <Views />;
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ThemeProvider>
    <GlobalStyles />
    <NotificationContainer />
    <Router history={history}>
      <DependenciesProvider value={dependencies}>
        <ReduxProvider store={store}>
          <App />
        </ReduxProvider>
      </DependenciesProvider>
    </Router>
  </ThemeProvider>,
);
