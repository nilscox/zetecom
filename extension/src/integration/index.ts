import { iframeResizer } from 'iframe-resizer';

import createIframe, { getIframe } from './iframe';
import createSwitcher from './switcher';
import loadFont from './font';
import { sendMessageToBackgroundScript, sendMessageToIFrame, onMessageFromIFrame } from './messages';
import log from './log';

import './integration.css';

declare global {
  interface HTMLIFrameElement {
    iFrameResizer?: any;
  }
}

type IntegrationType = 'insert' | 'switch';

type Integration = {
  getElement: () => HTMLElement | null;
  getIdentifier: () => string | null;
  healthcheck: () => boolean;
  type: IntegrationType;
  originalText?: string;
  integrationText?: string;
  darkMode?: boolean;
};

const setupIntegration = (integration: Integration, element: HTMLElement): void => {
  const identifier = integration.getIdentifier();

  if (!identifier)
    return;

  const iframe = createIframe(identifier);

  if (integration.type === 'switch') {
    loadFont();

    const switcher = createSwitcher(
      Boolean(integration.darkMode),
      { text: integration.originalText!, element },
      { text: integration.integrationText!, element: iframe },
    );

    element.insertAdjacentElement('afterend', iframe);
    element.insertAdjacentElement('beforebegin', switcher);
  } else if (integration.type === 'insert') {
    element.insertAdjacentElement('afterend', iframe);
  }

  iframeResizer({ log: false, checkOrigin: false }, iframe);
};

const unloadIntegration = (integration: Integration) => {
  const iframe = getIframe();
  const element = integration.getElement();

  if (!iframe || !element)
    return;

  if (integration.type === 'switch') {
    const switcher = document.querySelector('#ri-switcher');

    if (!switcher)
      return;

    switcher.replaceWith(element);
    switcher.remove();
  } else if (integration.type === 'insert') {
    iframe.remove();
  }

  iframe.iFrameResizer.close();
};

export default (integration: Integration) => {
  let currentIdentifier: string | null = null;
  let intervalId: NodeJS.Timeout;

  log('setup INTEGRATION_LOADED listener');

  onMessageFromIFrame('INTEGRATION_LOADED', () => {
    log('message INTEGRATION_LOADED');
    sendMessageToBackgroundScript({ type: 'SET_EXTENSION_ACTIVE' });
  });

  setInterval(() => {
    const identifier = integration.getIdentifier();
    log('getIdentifier', identifier);

    const iframe = getIframe();
    log('getIframe', iframe);

    if (iframe) {
      const healthy = integration.healthcheck();
      log('healthcheck', healthy);

      if (!healthy) {
        currentIdentifier = null;
        return unloadIntegration(integration);
      }
    }

    if (currentIdentifier === identifier)
      return;

    currentIdentifier = identifier;
    log('identifier changed', currentIdentifier);

    clearInterval(intervalId);
    sendMessageToBackgroundScript({ type: 'UNSET_EXTENSION_ACTIVE' });

    if (identifier === null)
      return;

    if (iframe)
      return sendMessageToIFrame(iframe, { type: 'IDENTIFIER_CHANGED', identifier });

    intervalId = setInterval(() => {
      const element = integration.getElement();
      log('getElement', element);

      if (!element)
        return;

      clearInterval(intervalId);

      log('setupIntegration', integration);
      setupIntegration(integration, element);
    }, 500);
  }, 1000);
};
