import React from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import axios from 'axios';
import moment from 'moment';
import queryString from 'query-string';

import { App } from './App';
import { getBaseUrl } from './utils/base-url';

const root = document.getElementById('app');

const setup = () => {
  moment.locale('fr');
  axios.defaults.baseURL = getBaseUrl();

  ReactModal.setAppElement('#app');

  if (process.env.NODE_ENV === 'devlopment')
    (window as any).axios = axios;
};

const renderApp = (root: HTMLElement) => {
  const { youtubeId } = queryString.parse(window.location.search);

  if (youtubeId && typeof youtubeId === 'string')
    ReactDOM.render(<App youtubeId={youtubeId} />, root);
};

setup();
renderApp(root);

// if (process.env.NODE_ENV === 'development' && window.location.href.match(/localhost/)) {
  // root.style.maxWidth = '640px';
  // root.style.margin = 'auto';
// }
