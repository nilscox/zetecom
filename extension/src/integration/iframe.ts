import { iframeResizer } from 'iframe-resizer';
import queryString from 'query-string';

const pkg = require('../../package');

const APP_URL = process.env.APP_URL as string;

export default class IFrame {
  private iframe: HTMLIFrameElement;

  constructor(identifier: string) {
    this.iframe = this.createIframe(identifier);
  }

  get element() {
    return this.iframe;
  }

  unmount() {
    this.element.remove();
  }

  loadIframeResizer() {
    iframeResizer({ log: false, checkOrigin: false }, this.iframe);
  }

  private createIframe(identifier: string) {
    const iframe = document.createElement('iframe');

    const query = {
      identifier: encodeURIComponent(identifier),
      pageUrl: encodeURIComponent(window.location.href),
      extensionVersion: pkg.version,
    };

    iframe.id = 'zc-iframe';
    iframe.src = APP_URL + '/integration?' + queryString.stringify(query);
    iframe.scrolling = 'no';
    iframe.style.width = '1px';
    iframe.style.minWidth = '100%';
    iframe.style.border = 'none';
    iframe.style.display = 'block';

    return iframe;
  }
}
