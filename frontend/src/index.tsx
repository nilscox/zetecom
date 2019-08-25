import axios from 'axios';
import moment from 'moment';
import queryString from 'query-string';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import * as Sentry from '@sentry/browser';

import App from './App';
import env from './utils/env';

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
  moment.locale('fr');
  axios.defaults.baseURL = getApiRootUrl();

  ReactModal.setAppElement(root);

  if (env.NODE_ENV === 'devlopment') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).axios = axios;
  }
};

setup();
ReactDOM.render(<App />, root);
