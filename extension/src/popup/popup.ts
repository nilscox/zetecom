import { iframeResizer } from 'iframe-resizer';

import log from '../utils/log';
import {
  IFrameToPopupMessage,
  PopupToBackgroundScriptMessage,
  PopupToContentScriptMessage,
  PopupToIFrameMessage,
} from '../types';

const iframe = document.getElementById('popup-iframe') as HTMLIFrameElement;

const sendMessageToPopup = (message: PopupToIFrameMessage) => {
  log('send message to popup', message);
  iframe.contentWindow?.postMessage(message, process.env.APP_URL!);
};

const sendMessageToContentScript = (message: PopupToContentScriptMessage, onResponse?: (response: any) => void) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]?.id) {
      log('send message to app', message);
      chrome.tabs.sendMessage(tabs[0].id, message, onResponse);
    }
  });
};

const sendMessageToBackgroundScript = (
  message: PopupToBackgroundScriptMessage,
  onResponse?: (response: any) => void,
) => {
  log('send message to background script', message);
  chrome.runtime.sendMessage(message, onResponse);
};

const handleIFrameMessage = (message: IFrameToPopupMessage) => {
  if (typeof message.type !== 'string') {
    return;
  }

  log('message from popup', message);

  if (message.type === 'focusApp') {
    return sendMessageToContentScript(message);
  }

  if (message.type === 'getIntegrationState') {
    return sendMessageToContentScript(message, (state) => {
      sendMessageToPopup({ type: 'integrationState', state });
    });
  }

  if (message.type === 'getExtensionConfig') {
    return sendMessageToBackgroundScript(message, (config) => {
      sendMessageToPopup({ type: 'extensionConfig', config });
    });
  }

  if (message.type === 'setExtensionConfig') {
    return sendMessageToBackgroundScript(message);
  }
};

window.addEventListener('message', ({ data }) => handleIFrameMessage(data));

iframe.src = `${process.env.APP_URL}/popup?pageUrl=${location.origin}`;
iframeResizer({ log: false, checkOrigin: false }, iframe);
