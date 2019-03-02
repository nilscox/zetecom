import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';

import App from './App';

const HotApp = hot(module)(App);

window.addEventListener('message', (e) => {
    if (typeof e.data === 'object' && e.data.event === 'setToken')
      ReactDOM.render(<HotApp token={e.data.token} />, document.getElementById('app'));
}, false);
