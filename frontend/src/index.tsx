import React from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import axios from 'axios';
import moment from 'moment';
import queryString from 'query-string';

import { App } from './App';
import { getBaseUrl } from './utils/base-url';

import './fonts.css';

moment.locale('fr');
axios.defaults.baseURL = getBaseUrl();

ReactModal.setAppElement('#app');

if (process.env.NODE_ENV === 'devlopment')
  (window as any).axios = axios;

const { youtubeId } = queryString.parse(window.location.search);
const root = document.getElementById('app');

if (youtubeId && typeof youtubeId === 'string')
  ReactDOM.render(<App youtubeId={youtubeId} />, root);

if (process.env.NODE_ENV === 'development' && window.location.href.match(/localhost/)) {
  root.style.maxWidth = '640px';
  root.style.margin = 'auto';
}
