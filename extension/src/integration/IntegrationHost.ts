import log from '../utils/log';
import { ContentScriptMessages } from './ContentScriptMessages';
import IFrame from './IFrame';
import { ExtensionConfig } from '../types';

import { AppendIntegrationRuntime } from './runtimes/AppendIntegrationRuntime';
import { SwitcherIntegrationRuntime } from './runtimes/SwitcherIntegrationRuntime';
import { OverlayIntegrationRuntime } from './runtimes/OverlayIntegrationRuntime';

export interface Integration {
  name: string;
  domains: string[];
  type: 'append' | 'switch';
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
  readonly iframe?: IFrame;
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
  private config?: ExtensionConfig;

  private messages = new ContentScriptMessages(this);

  get state() {
    return {
      available: !!this.runtime,
      loaded: this.loaded,
    };
  }

  register(integration: Integration) {
    this.integrations.push(integration);
  }

  loadFont() {
    const font = document.createElement('link');

    font.href = 'https://fonts.googleapis.com/css2?family=Montserrat&display=swap';
    font.rel = 'stylesheet';

    document.head.appendChild(font);
  }

  async run() {
    log('starting integration host');

    log('loading font');
    this.loadFont();

    log('registering location change handler');
    watchPageUrl(() => this.handleLocationChange());

    this.config = await this.messages.sendToBackgroundScript('getExtensionConfig');
    log('extension config', this.config);

    log('initializing integration');
    this.initialize();
  }

  setConfig(config: ExtensionConfig) {
    this.messages.sendToBackgroundScript('setExtensionConfig', { config });
  }

  onIntegrationLoaded(commentsAreaId: number, comments: number) {
    this.loaded = true;

    this.messages.sendToBackgroundScript('setExtensionActive', { comments });

    if (this.runtime) {
      this.runtime.commentsAreaId = commentsAreaId;
    }
  }

  sendMessageToApp(message: unknown) {
    this.runtime?.iframe?.element.contentWindow?.postMessage(message, process.env.APP_URL!);
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

    this.messages.sendToBackgroundScript('unsetExtensionActive');

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
    const { name, type } = integration;
    const integrationConfig = this.config?.mediaIntegrations[name] ?? 'integration';

    if (integrationConfig === 'integration') {
      if (type === 'append') {
        return new AppendIntegrationRuntime(integration);
      }

      if (type === 'switch') {
        return new SwitcherIntegrationRuntime(integration);
      }
    }

    if (integrationConfig === 'overlay') {
      return new OverlayIntegrationRuntime(integration);
    }

    return null;
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

    const runtime = this.getRuntime(integration);

    if (!runtime) {
      return log('integration is disabled');
    }

    this.runtime = runtime;

    log('mounting integration');
    this.runtime.mount();

    log('integration mounted');

    this.identifier = identifier;
  }

  showCommentsArea() {
    if (!this.runtime) {
      return;
    }

    if ('focusTab' in this.runtime) {
      (this.runtime as SwitcherIntegrationRuntime).focusTab('right');
    }

    this.runtime.show();
  }
}
