import { BaseIntegrationRuntime } from './BaseIntegrationRuntime';
import IFrame from '../iframe';
import log from '../log';

export class AppendIntegrationRuntime extends BaseIntegrationRuntime {
  mount() {
    const { identifier, element } = this;

    if (!identifier) {
      throw new Error('cannot get identifier');
    }

    if (!element) {
      throw new Error('cannot get element');
    }

    log('creating iframe');
    const iframe = (this.iframe = new IFrame(identifier));

    element.insertAdjacentElement('afterend', iframe.element);

    log('loading iframe resizer');
    iframe.loadIframeResizer();

    this.integration.onIFrameLoaded?.(iframe.element);
  }

  unmount() {
    log('unmounting iframe');
    this.iframe?.unmount();
  }

  show() {
    if (this.iframe) {
      this.scrollIntoViewOffset(this.iframe.element);
    }
  }
}
