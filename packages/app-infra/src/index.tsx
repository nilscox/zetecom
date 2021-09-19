import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { initialize } from '@zetecom/app-core';
import { createBrowserHistory } from 'history';
import { Provider as ReduxProvider, useDispatch } from 'react-redux';
import { Router } from 'react-router-dom';

import { NotificationContainer } from './components/elements/NotificationContainer/NotificationContainer';
import { FetchHttpAdapter } from './gateways/adapters/HttpAdapter';
import { HTTPCommentGateway } from './gateways/HTTPCommentGateway';
import { HTTPCommentsAreaGateway } from './gateways/HTTPCommentsAreaGateway';
import { HTTPUserGateway } from './gateways/HTTPUserGateway';
import { ReactRouterGateway } from './gateways/ReactRouterGateway';
import { RealDateGateway } from './gateways/RealDateGateway';
import { RealExtensionGateway } from './gateways/RealExtensionGateway';
import { RealTimerGateway } from './gateways/RealTimerGateway';
import { ToastifyNotificationGateway } from './gateways/ToastifyNotificationGateway';
import { useHandleAuthenticationTokens } from './hooks/useHandleAuthenticationTokens';
import { GlobalStyles } from './theme/GlobalStyles';
import { ThemeProvider } from './theme/ThemeProvider';
import { configureStore } from './utils/configureStore';
import { demoStore } from './utils/demoStore';
import { getEnv } from './utils/env';
import { Views } from './views';

const history = createBrowserHistory({
  basename: getEnv('BASENAME'),
});

const createStore = () => {
  if (getEnv('DEMO') === 'true') {
    return demoStore(history);
  }

  // there is a default value in webpack config
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const http = new FetchHttpAdapter(getEnv('API_URL')!);

  return configureStore({
    commentsAreaGateway: new HTTPCommentsAreaGateway(http),
    commentGateway: new HTTPCommentGateway(http),
    userGateway: new HTTPUserGateway(http),
    notificationGateway: new ToastifyNotificationGateway(),
    extensionGateway: new RealExtensionGateway(history),
    routerGateway: new ReactRouterGateway(history),
    dateGateway: new RealDateGateway(),
    timerGateway: new RealTimerGateway(),
  });
};

const store = createStore();

const App: React.FC = () => {
  const dispatch = useDispatch();

  // prevent rendering before isFetchingAuthenticatedUser is true
  // to avoid being redirect by the <Authenticated /> component
  const [render, setRender] = useState(false);

  useEffect(() => {
    dispatch(initialize());
    setRender(true);
  }, []);

  useEffect(() => {
    const script = document.createElement('script');

    script.src = '//embed.typeform.com/next/embed.js';
    document.body.appendChild(script);
  }, []);

  useHandleAuthenticationTokens();

  if (!render) {
    return null;
  }

  return <Views />;
};

ReactDOM.render(
  <ThemeProvider>
    <GlobalStyles />
    <NotificationContainer />
    <Router history={history}>
      <ReduxProvider store={store}>
        <App />
      </ReduxProvider>
    </Router>
  </ThemeProvider>,
  document.getElementById('root'),
);
