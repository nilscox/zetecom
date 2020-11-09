import { iframeResizer } from 'iframe-resizer';

import createIframe, { getIframe } from './iframe';
import createSwitcher from './switcher';
import loadFont from './font';
import { sendMessageToBackgroundScript, sendMessageToIFrame, onMessageFromIFrame, onMessageFromContentScript } from './messages';
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
  getIdentifier: (url: string) => string | null;
  healthcheck: () => boolean;
  type: IntegrationType;
  originalText?: string;
  integrationText?: string;
  darkMode?: boolean;
};

const setupIntegration = (integration: Integration, element: HTMLElement, initialTab: 'left' | 'right'): void => {
  const identifier = integration.getIdentifier(window.location.href);

  if (!identifier)
    return;

  const iframe = createIframe(identifier);

  if (integration.type === 'switch') {
    loadFont();

    const [switcher, setTab] = createSwitcher(
      Boolean(integration.darkMode),
      { text: integration.originalText!, element },
      { text: integration.integrationText!, element: iframe },
    );

    setTab(initialTab);

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
    const switcher = document.querySelector('#zc-switcher');

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
  let currentTab: 'left' | 'right' = 'left';
  let intervalId: NodeJS.Timeout;

  log('setup INTEGRATION_LOADED listener');

  onMessageFromIFrame('INTEGRATION_LOADED', () => {
    log('message INTEGRATION_LOADED');
    sendMessageToBackgroundScript({ type: 'SET_EXTENSION_ACTIVE' });
  });

  onMessageFromContentScript('TAB_CHANGED', ({ tab }) => {
    log('message TAB_CHANGED', tab);
    currentTab = tab;
  });

  setInterval(() => {
    const identifier = integration.getIdentifier(window.location.href);
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
    } else {
      currentIdentifier = null;
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
      setupIntegration(integration, element, currentTab);
    }, 500);
  }, 1000);
};
