import log from './log';
import { Message, Messages } from './Messages';

import { AppendIntegrationRuntime } from './runtimes/AppendIntegrationRuntime';
import { SwitcherIntegrationRuntime } from './runtimes/SwitcherIntegrationRuntime';
import { OverlayIntegrationRuntime } from './runtimes/OverlayIntegrationRuntime';

export interface Integration {
  name: string;
  domains: string[];
  type: 'append' | 'switch' | 'overlay';
  externalElementTabText?: string;
  scrollIntoViewOffset?: number;
  darkMode?: boolean;
  getElement: () => HTMLElement | null;
  getIdentifier: (url: string) => string | null;
  onIFrameLoaded?: (iframe: HTMLIFrameElement) => void;
}

export interface IntegrationRuntime {
  commentsAreaId?: number;
  readonly integration: Integration;
  readonly identifier: string | null;
  mount(): void;
  unmount(): void;
  show(): void;
}

const watchPageUrl = (cb: () => void) => {
  let oldHref = document.location.href;

  const observer = new MutationObserver((mutations) => {
    mutations.forEach(() => {
      if (oldHref !== document.location.href) {
        oldHref = document.location.href;
        cb();
      }
    });
  });

  observer.observe(document.querySelector('body')!, { childList: true, subtree: true });
};

export class IntegrationHost {
  private integrations: Integration[] = [];
  private runtime?: IntegrationRuntime;
  private identifier?: string;
  private loaded = false;

  register(integration: Integration) {
    this.integrations.push(integration);
  }

  loadFont() {
    const font = document.createElement('link');

    font.href = 'https://fonts.googleapis.com/css2?family=Montserrat&display=swap';
    font.rel = 'stylesheet';

    document.head.appendChild(font);
  }

  run() {
    log('starting integration host');

    log('loading font');
    this.loadFont();

    log('registering location change handler');
    watchPageUrl(() => this.handleLocationChange());

    log('registering iframe messages handler');
    Messages.listen('iframe', (message) => this.handleIframeMessage(message));

    log('registering runtime messages handler');
    Messages.listen('runtime', (message) => this.handleRuntimeMessage(message));

    log('initializing integration');
    this.initialize();
  }

  handleIframeMessage(message: Message) {
    if (message.type === 'INTEGRATION_LOADED') {
      this.loaded = true;

      Messages.send('runtime', { type: 'SET_EXTENSION_ACTIVE', comments: message.comments });

      if (this.runtime) {
        this.runtime.commentsAreaId = message.commentsAreaId;
      }
    }
  }

  handleRuntimeMessage(message: Message) {
    if (message.type === 'SCROLL_IFRAME_INTO_VIEW') {
      this.scrollIntoView();
    } else if (message.type === 'GET_INTEGRATION_STATE') {
      const state = {
        available: !!this.runtime,
        loaded: this.loaded,
      };

      Messages.send('runtime', { type: 'INTEGRATION_STATE', state });
    }
  }

  handleLocationChange() {
    log('location changed', location.href);

    if (!this.runtime) {
      log('initializing integration');
      return this.initialize();
    }

    const identifier = this.runtime.identifier;

    if (identifier === this.identifier) {
      log('identifier did not change');
      return;
    }

    log('unmounting integration');
    this.runtime.unmount();
    this.runtime = undefined;
    this.loaded = false;

    Messages.send('runtime', { type: 'UNSET_EXTENSION_ACTIVE' });

    if (identifier) {
      setTimeout(() => {
        log('reinitializing integration');
        this.initialize();
      }, 0);
    }
  }

  initialize() {
    const integration = this.getIntegration();

    if (!integration) {
      return;
    }

    log('integration: ' + integration.name);

    log('mounting integration');
    this.mount(integration);
  }

  getIntegration() {
    const match = this.integrations.filter((i) => i.domains.includes(location.host));

    if (match.length === 0) {
      return log('no integration match the current domain');
    }

    if (match.length > 1) {
      return log('multiple integrations match the current domain');
    }

    return match[0];
  }

  getRuntime(integration: Integration) {
    if (integration.type === 'append') {
      return new AppendIntegrationRuntime(integration);
    }

    if (integration.type === 'switch') {
      return new SwitcherIntegrationRuntime(integration);
    }

    return new OverlayIntegrationRuntime(integration);
  }

  mount(integration: Integration) {
    const identifier = integration.getIdentifier(location.href);

    if (!identifier) {
      return log('did not match identifier');
    }

    const element = integration.getElement();

    if (!element) {
      log('cannot find element');
      setTimeout(() => this.mount(integration), 200);
      return;
    }

    log('element: ', element);
    log(`identifier: "${identifier}"`);

    this.runtime = this.getRuntime(integration);

    log('mounting integration');
    this.runtime.mount();

    log('integration mounted');

    this.identifier = identifier;
  }

  scrollIntoView() {
    if (!this.runtime) {
      return;
    }

    if ('focusTab' in this.runtime) {
      (this.runtime as SwitcherIntegrationRuntime).focusTab('right');
    }

    this.runtime.show();
  }
}
