/* eslint-disable simple-import-sort/imports */

import 'reflect-metadata';

import React from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import queryString from 'query-string';

import 'dayjs/locale/fr';

// keep this imports first
import './utils/zetecom-global';
import './utils/sentry';

import App from './App';
import env from './utils/env';

const getApiRootUrl = () => {
  return [queryString.parse(window.location.search).api_url as string | undefined, env.API_URL].filter(u => !!u)[0];
};

const main = () => {
  dayjs.extend(utc);
  dayjs.locale('fr');

  axios.defaults.baseURL = getApiRootUrl();
  axios.defaults.withCredentials = true;

  ReactDOM.render(<App />, document.getElementById('app'));
};

main();

if (import.meta.hot) {
  import.meta.hot.accept();
}
