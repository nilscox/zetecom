import { Integration } from './IntegrationHost';
import IFrame from './iframe';
import Switcher from './switcher';
import log from './log';
import { Message, Messages } from './Messages';

export interface IntegrationRuntime {
  readonly integration: Integration;
  readonly identifier: string | null;
  mount(): void;
  unmount(): void;
}

abstract class BaseIntegrationRuntime implements IntegrationRuntime {
  protected iframe?: IFrame;

  constructor(public readonly integration: Integration) {}

  get identifier() {
    return this.integration.getIdentifier(location.href);
  }

  get element() {
    return this.integration.getElement();
  }

  abstract mount(): void;
  abstract unmount(): void;
}

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
    const iframe = this.iframe = new IFrame(identifier);

    element.insertAdjacentElement('afterend', iframe.element);

    log('loading iframe resizer');
    iframe.loadIframeResizer();
  }

  unmount() {
    Messages.send('backgroundScript', { type: 'UNSET_EXTENSION_ACTIVE' });

    log('unmounting iframe');
    this.iframe?.unmount();
  }
}

export class SwitcherIntegrationRuntime extends BaseIntegrationRuntime {
  private switcher?: Switcher;

  mount() {
    const { integration, identifier, element } = this;

    if (!identifier) {
      throw new Error('cannot get identifier');
    }

    if (!element) {
      throw new Error('cannot get element');
    }

    log('creating iframe');
    const iframe = this.iframe = new IFrame(identifier);

    log('creating switcher');
    const switcher = this.switcher = new Switcher(integration.externalElementTabText!, 'Commentaires Zétécom', !!integration.darkMode);

    element.insertAdjacentElement('beforebegin', switcher.tabsElement);
    element.insertAdjacentElement('afterend', iframe.element);

    switcher.left = element;
    switcher.right = iframe.element;

    switcher.focus('left');

    log('loading iframe resizer');
    iframe.loadIframeResizer();
  }

  unmount() {
    Messages.send('backgroundScript', { type: 'UNSET_EXTENSION_ACTIVE' });

    log('unmounting switcher');
    this.switcher?.unmount();

    log('unmounting iframe');
    this.iframe?.unmount();
  }
}
