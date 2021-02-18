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
import './domain/zetecom-global';
import './utils/sentry';

import App from './App';
import env from './utils/env';

dayjs.extend(utc);
dayjs.locale('fr');

const getBaseUrl = () => {
  return [
    queryString.parse(window.location.search).api_url as string | undefined,
    localStorage.getItem('API_URL'),
    env.API_URL,
  ].find(Boolean);
};

axios.defaults.baseURL = getBaseUrl();
axios.defaults.withCredentials = true;

ReactDOM.render(<App />, document.getElementById('app'));
