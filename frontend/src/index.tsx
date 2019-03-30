import React from 'react';
import ReactDOM from 'react-dom';

import ReactModal from 'react-modal';

import moment from 'moment';
import axios from 'axios';
import queryString from 'query-string';

import { App } from './App';

moment.locale('fr');
axios.defaults.baseURL = 'http://localhost:3000';

ReactModal.setAppElement('#app');

// testing purpose
(window as any).axios = axios;

const { youtubeId } = queryString.parse(window.location.search);
const root = document.getElementById('app');

if (youtubeId && typeof youtubeId === 'string')
  ReactDOM.render(<App youtubeId={youtubeId} />, root);
