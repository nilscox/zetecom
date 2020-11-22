import { iframeResizer } from 'iframe-resizer';

import log from '../integration/log';

const iframeMessages = ['SCROLL_IFRAME_INTO_VIEW', 'GET_INTEGRATION_STATE'];
const contentScriptMessages = ['INTEGRATION_STATE'];

window.addEventListener('DOMContentLoaded', () => {
  const iframe: HTMLIFrameElement = document.getElementById('popup-iframe') as HTMLIFrameElement;

  if (!iframe) {
    return;
  }

  chrome.runtime.onMessage.addListener((data) => {
    if (!contentScriptMessages.includes(data.type)) {
      return;
    }

    log('popup forward to iframe', data);
    iframe.contentWindow?.postMessage(data, process.env.APP_URL!);
  });

  window.addEventListener('message', ({ data }) => {
    if (!iframeMessages.includes(data?.type)) {
      return;
    }

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        log('popup forward to tab', data);
        chrome.tabs.sendMessage(tabs[0].id, data);
      }
    });
  });

  iframe.src = `${process.env.APP_URL}/popup?origin=${location.origin}`;
  iframeResizer({ log: false, checkOrigin: false }, iframe);
});
