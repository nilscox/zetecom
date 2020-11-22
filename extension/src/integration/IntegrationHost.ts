import loadFont from './font';
import { AppendIntegrationRuntime, IntegrationRuntime, SwitcherIntegrationRuntime } from './IntegrationRuntime';
import log from './log';
import { Message, Messages } from './Messages';

export interface Integration {
  name: string;
  domains: string[];
  type: 'append' | 'switch';
  externalElementTabText?: string;
  darkMode?: boolean;
  getElement: () => HTMLElement | null;
  getIdentifier: (url: string) => string | null;
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

  register(integration: Integration) {
    this.integrations.push(integration);
  }

  run() {
    log('starting integration host');

    log('loading font');
    loadFont();

    log('registering location change handler');
    watchPageUrl(() => this.handleLocationChange());

    log('registering messages handler');
    Messages.listen((message) => this.handleMessage(message));

    log('initializing integration');
    this.initialize();
  }

  handleMessage(message: Message) {
    if (message.type === 'INTEGRATION_LOADED') {
      Messages.send('backgroundScript', { type: 'SET_EXTENSION_ACTIVE' });
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

    if (identifier) {
      setTimeout(() => {
        log('creating runtime');
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

    return new SwitcherIntegrationRuntime(integration);
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

    log(`element: "${element}"`);
    log(`identifier: "${identifier}"`);

    this.runtime = this.getRuntime(integration);

    log('mounting integration');
    this.runtime.mount();

    log('integration mounted');

    this.identifier = identifier;
  }
}
