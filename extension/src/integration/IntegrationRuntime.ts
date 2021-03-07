import { Integration } from './IntegrationHost';
import IFrame from './iframe';
import Switcher from './switcher';
import log from './log';

export interface IntegrationRuntime {
  readonly integration: Integration;
  readonly identifier: string | null;
  mount(): void;
  unmount(): void;
  scrollIntoView(): void;
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
  abstract scrollIntoView(): void;

  protected scrollIntoViewOffset(el: HTMLElement) {
    const scrollIntoViewElement = document.createElement('div');

    scrollIntoViewElement.id = 'zc-scrollIntoView';

    scrollIntoViewElement.style.position = 'absolute';
    scrollIntoViewElement.style.top =
      el.getBoundingClientRect().top +
      (document.defaultView?.pageYOffset ?? 0) -
      (this.integration.scrollIntoViewOffset ?? 100) +
      'px';

    document.body.append(scrollIntoViewElement);
    scrollIntoViewElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    document.body.removeChild(scrollIntoViewElement);
  }
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

  scrollIntoView() {
    if (this.iframe) {
      this.scrollIntoViewOffset(this.iframe.element);
    }
  }
}

export class SwitcherIntegrationRuntime extends BaseIntegrationRuntime {
  private switcher?: Switcher;

  focusTab(tab: 'left' | 'right') {
    this.switcher?.focus(tab);
  }

  mount() {
    const { integration, identifier, element } = this;

    if (!identifier) {
      throw new Error('cannot get identifier');
    }

    if (!element) {
      throw new Error('cannot get element');
    }

    if (document.querySelector('iframe#zc-iframe')) {
      throw new Error('zc-iframe already exists in the document');
    }

    log('creating iframe');
    const iframe = (this.iframe = new IFrame(identifier));

    log('creating switcher');
    const switcher = (this.switcher = new Switcher(
      integration.externalElementTabText!,
      'Commentaires Zétécom',
      !!integration.darkMode,
    ));

    element.insertAdjacentElement('beforebegin', switcher.tabsElement);
    element.insertAdjacentElement('afterend', iframe.element);

    switcher.left = element;
    switcher.right = iframe.element;

    this.focusTab('left');

    log('loading iframe resizer');
    iframe.loadIframeResizer();
  }

  unmount() {
    log('unmounting switcher');
    this.switcher?.unmount();

    log('unmounting iframe');
    this.iframe?.unmount();
  }

  scrollIntoView() {
    if (this.switcher) {
      this.scrollIntoViewOffset(this.switcher.tabsElement);
    }
  }
}
