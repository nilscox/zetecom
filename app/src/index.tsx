/* eslint-disable simple-import-sort/sort */

import 'reflect-metadata';

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

if (env.SENTRY_DSN) {
  Sentry.init({ dsn: env.SENTRY_DSN });
}

const getApiRootUrl = () => {
  return [queryString.parse(window.location.search).api_url as string | undefined, env.API_URL].filter(u => !!u)[0];
};

const main = () => {
  dayjs.locale('fr');

  axios.defaults.baseURL = getApiRootUrl();
  axios.defaults.withCredentials = true;

  ReactDOM.render(<App />, document.getElementById('app'));
};

main();
