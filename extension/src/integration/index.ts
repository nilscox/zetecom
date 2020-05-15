import { iframeResizer } from 'iframe-resizer';

import setupBadgeListener from './badge';
import createIframe from './iframe';
import createSwitcher from './switcher';
import loadFont from './font';

declare global {
  interface HTMLIFrameElement {
    iFrameResizer?: any;
  }
}

const setupSwitcher = (integration: Integration, iframe: HTMLIFrameElement, element: HTMLElement) => {
  const parent: HTMLElement = element.parentElement!;

  const switcher = createSwitcher(
    Boolean(integration.darkMode),
    { text: integration.originalText!, element },
    { text: integration.integrationText!, element: iframe },
  );

  element.replaceWith(switcher);
  setupCleanupSwitcher(parent, element, switcher)
};

const setupCleanupSwitcher = (parent: HTMLElement, element: HTMLElement, switcher: HTMLElement) => {
  const originalRemoveChild = parent.removeChild.bind(parent);

  (parent as any).removeChild = (elementToRemove: HTMLElement) => {
    if (elementToRemove === element) {
      switcher.removeChild(element);
      return element;
    }

    return originalRemoveChild(elementToRemove);
  };
};

type IntegrationType = 'insert' | 'switch';

type Integration = {
  getElement: () => HTMLElement | null;
  getIdentifier: () => string | null;
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
    setupSwitcher(integration, iframe, element);
  } else if (integration.type === 'insert') {
    element.insertAdjacentElement('afterend', iframe);
  }

  iframeResizer({ log: false, checkOrigin: false }, iframe);
};

export default (integration: Integration) => {
  setupBadgeListener();

  setInterval(() => {
    const iframe = document.getElementById('ri-iframe');

    if (iframe)
      return;

    const element = integration.getElement();

    if (!element)
      return;

    setupIntegration(integration, element);
  }, 2000);
};

// export default (integration: Integration) => {
//   if (document.readyState === 'complete' || document.readyState === 'loaded' || document.readyState === 'interactive')
//     setupIntegration(integration);
//
//   window.addEventListener('DOMContentLoaded', () => setupIntegration(integration));
// };
