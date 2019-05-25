import React from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import axios from 'axios';
import moment from 'moment';
import queryString from 'query-string';

import { App } from './App';

const root = document.getElementById('app');

const getApiRootUrl = () => {
  return [
    queryString.parse(window.location.search).api_url as string,
    localStorage.getItem('API_URL'),
    process.env.API_URL,
  ].filter(u => !!u)[0];
};

const setup = () => {
  moment.locale('fr');
  axios.defaults.baseURL = getApiRootUrl();

  ReactModal.setAppElement('#app');

  if (process.env.NODE_ENV === 'devlopment') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).axios = axios;
  }
};

const renderApp = (root: HTMLElement) => {
  ReactDOM.render(<App />, root);
};

setup();
renderApp(root);
