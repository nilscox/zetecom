import { iframeResizer } from 'iframe-resizer';

const pkg = require('../package');

const APP_URL = process.env.APP_URL as string;

let href = window.location.href;
const activeUrls: string[] = [];

const setupListener = () => {
  setInterval(watchPageChange, 1000);

  window.addEventListener('message', ({ data }) => {
    if (data.type === 'INTEGRATION_LOADED') {
      if (!activeUrls.includes(href))
        activeUrls.push(href);

      chrome.runtime.sendMessage({ type: 'SET_EXTENSION_ACTIVE' });
    }
  });
}

const watchPageChange = () => {
  if (href !== window.location.href) {
    href = window.location.href;

    if (activeUrls.includes(href))
      chrome.runtime.sendMessage({ type: 'SET_EXTENSION_ACTIVE' });
    else
      chrome.runtime.sendMessage({ type: 'UNSET_EXTENSION_ACTIVE' });
  }
};

const createIframe = (url: string) => {
  const iframe = document.createElement('iframe');
  const query = [
    ['url', encodeURIComponent(url)].join('='),
    ['extensionVersion', pkg.version].join('='),
  ].join('&');

  iframe.id = 'ri-iframe';
  iframe.src = APP_URL + '/integration?' + query;
  iframe.scrolling = 'no';
  iframe.style.width = '1px';
  iframe.style.minWidth = '100%';
  iframe.style.border = 'none';
  iframe.style.display = 'block';

  return iframe;
}

const setupIntegration = (): void => {
  const comments = document.getElementById('comments') || document.getElementById('comment-section-renderer');
  const iframe = createIframe(window.location.href);

  const container = document.createElement('div');

  container.appendChild(iframe);

  if (!comments)
    return void setTimeout(setupIntegration, 300);

  comments?.replaceWith(container)

  setupListener();
  iframeResizer({ log: false, checkOrigin: false }, iframe);
};

export default setupIntegration;
