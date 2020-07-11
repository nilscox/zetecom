/* eslint-disable simple-import-sort/sort */

// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="index.d.ts" />

import { setConfig } from 'react-hot-loader';

import React from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';
import dayjs from 'dayjs';
import queryString from 'query-string';
import ReactModal from 'react-modal';

import App from './App';
import env from './utils/env';
import ReactGA from './utils/ga';

import 'dayjs/locale/fr';
import * as Sentry from '@sentry/browser';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require('../package.json');

declare global {
  interface Window {
    ZETECOM_APP_VERSION: string;
  }
}

setConfig({
  reloadHooks: false,
});

if (env.NODE_ENV === 'production')
  Sentry.init({ dsn: 'https://51c4eddbbeee4643a355e27533be2891@sentry.io/1536528' });

const root = document.getElementById('app');

const getApiRootUrl = () => {
  return [
    queryString.parse(window.location.search).api_url as string,
    localStorage.getItem('API_URL'),
    env.API_URL,
  ].filter(u => !!u)[0];
};

const setup = () => {
  if (env.GOOGLE_ANALYTICS_ID)
    ReactGA.initialize(env.GOOGLE_ANALYTICS_ID);

  dayjs.locale('fr');

  axios.defaults.baseURL = getApiRootUrl();
  axios.defaults.withCredentials = true;

  ReactModal.setAppElement(root);

  if (env.NODE_ENV === 'devlopment') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).axios = axios;
  }

  window.ZETECOM_APP_VERSION = pkg.version;
};

setup();
ReactDOM.render(<App />, root);
