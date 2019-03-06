import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';

import App from './App';

const HotApp = hot(module)(App);

const ALLOWED_ORIGINS = [
  'https://www.youtube.com',
];

window.addEventListener('message', (e) => {
  if (ALLOWED_ORIGINS.indexOf(e.origin) < 0)
    return;

  if (typeof e.data === 'object' && e.data.event === 'setToken')
    ReactDOM.render(<HotApp token={e.data.token} />, document.getElementById('app'));
}, false);
