/* eslint-disable simple-import-sort/sort */

import React from 'react';
import ReactDOM from 'react-dom';

import * as Sentry from '@sentry/browser';
import axios from 'axios';
import dayjs from 'dayjs';
import queryString from 'query-string';

import 'dayjs/locale/fr';

// keep this import first
import './utils/zetecom-global';

import App from './App';
import env from './utils/env';
import ReactGA from './utils/google-analytics';

if (env.NODE_ENV === 'production') {
  Sentry.init({ dsn: 'https://51c4eddbbeee4643a355e27533be2891@sentry.io/1536528' });
}

const getApiRootUrl = () => {
  return [
    queryString.parse(window.location.search).api_url as string | undefined,
    env.API_URL,
  ].filter(u => !!u)[0];
};

const main = () => {
  if (env.GOOGLE_ANALYTICS_ID) {
    ReactGA.initialize(env.GOOGLE_ANALYTICS_ID);
  }

  dayjs.locale('fr');

  axios.defaults.baseURL = getApiRootUrl();
  axios.defaults.withCredentials = true;

  ReactDOM.render(<App />, document.getElementById('app'));
};

main();
