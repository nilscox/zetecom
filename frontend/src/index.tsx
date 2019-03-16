import React from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';
import queryString from 'query-string';

import { App } from './App';

axios.defaults.baseURL = 'http://localhost:3000';

const { youtubeId } = queryString.parse(window.location.search);
const root = document.getElementById('app');

if (youtubeId && typeof youtubeId === 'string')
  ReactDOM.render(<App youtubeId={youtubeId} />, root);
