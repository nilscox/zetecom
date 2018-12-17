import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createFetchMiddleware } from 'redux-fetch';
import { createLogger } from 'redux-logger';

import env from '../env';
import App from './App';
import rootReducer from './redux/reducers';

const fetchMiddleware = createFetchMiddleware({
  baseUrl: env.PUBLIC_URL,
});

const logger = createLogger({
  collapsed: true,
  diff: true,
});

const store = createStore(rootReducer,
  applyMiddleware(
    fetchMiddleware,
    logger,
  ),
);

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('app'));
