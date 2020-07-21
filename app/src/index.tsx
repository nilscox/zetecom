/* eslint-disable simple-import-sort/sort */

// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="index.d.ts" />

import { setConfig } from 'react-hot-loader';

import React from 'react';
import ReactDOM from 'react-dom';

import * as Sentry from '@sentry/browser';
import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import queryString from 'query-string';
import ReactModal from 'react-modal';

// keep this import first, as it defines window.zetecom
import './utils/zetecom-global';

import pkg from '../package.json';

import App from './App';
import env from './utils/env';
import ReactGA from './utils/google-analytics';

window.zetecom.appVersion = pkg.version;

setConfig({
  reloadHooks: false,
});

if (env.NODE_ENV === 'production')
  Sentry.init({ dsn: 'https://51c4eddbbeee4643a355e27533be2891@sentry.io/1536528' });

const root = document.getElementById('app');

const getApiRootUrl = () => {
  return [
    queryString.parse(window.location.search).api_url as string | undefined,
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

  if (env.NODE_ENV === 'devlopment')
    window.zetecom.axios = axios;
};

setup();
ReactDOM.render(<App />, root);
