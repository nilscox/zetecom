import React from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import axios from 'axios';
import moment from 'moment';

import { App } from './App';

const root = document.getElementById('app');

const getApiRootUrl = () => {
  return [
    localStorage.getItem('API_URL'),
    process.env.API_URL,
  ].filter(u => !!u)[0];
};

const setup = () => {
  moment.locale('fr');
  axios.defaults.baseURL = getApiRootUrl();

  ReactModal.setAppElement('#app');

  if (process.env.NODE_ENV === 'devlopment')
    (window as any).axios = axios;
};

const renderApp = (root: HTMLElement) => {
    ReactDOM.render(<App />, root);
};

setup();
renderApp(root);

// if (process.env.NODE_ENV === 'development' && window.location.href.match(/localhost/)) {
  // root.style.maxWidth = '640px';
  // root.style.margin = 'auto';
// }
