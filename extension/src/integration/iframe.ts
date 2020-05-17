import queryString from 'query-string';

import log from './log';

// package.json is not part of tsconfig's includes
const pkg = require('../../package');

const APP_URL = process.env.APP_URL as string;

const createIframe = (identifier: string) => {
  const iframe = document.createElement('iframe');

  const query = {
    identifier: encodeURIComponent(identifier),
    origin: encodeURIComponent(window.location.origin),
    extensionVersion: pkg.version,
  };

  iframe.id = 'ri-iframe';
  iframe.src = APP_URL + '/integration?' + queryString.stringify(query);
  iframe.scrolling = 'no';
  iframe.style.width = '1px';
  iframe.style.minWidth = '100%';
  iframe.style.border = 'none';
  iframe.style.display = 'block';

  log('createIframe', iframe, query);

  return iframe;
}

export const getIframe = () => document.getElementById('ri-iframe') as HTMLIFrameElement | null;

export default createIframe;
