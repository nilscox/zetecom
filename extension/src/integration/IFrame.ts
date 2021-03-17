import { iframeResizer } from 'iframe-resizer';
import queryString from 'query-string';

const pkg = require('../../package');

const APP_URL = process.env.APP_URL as string;

export default class IFrame {
  private iframe: HTMLIFrameElement;

  constructor(media: string, identifier: string) {
    this.iframe = this.createIframe(media, identifier);
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

  resize() {
    if ('iFrameResizer' in this.element) {
      (this.element as any)?.iFrameResizer?.resize();
    } else {
      // sometimes, iframe resizer is not loaded, even if loadIframeResizer was called
      this.loadIframeResizer();
    }
  }

  private createIframe(media: string, identifier: string) {
    const iframe = document.createElement('iframe');

    const query = {
      pageUrl: window.location.href,
      extensionVersion: pkg.version,
    };

    iframe.id = 'zc-iframe';
    iframe.classList.add(media);
    iframe.src = `${APP_URL}/integration/${identifier}?${queryString.stringify(query)}`;
    iframe.scrolling = 'no';

    return iframe;
  }
}
