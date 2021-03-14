import { ExtensionConfig } from '../types';
import { BackgroundScriptMessages } from './BackgroundScriptMessage';

type Chrome = typeof chrome;

export class BackgroundScript {
  private color = '#45A63D';

  constructor(private readonly chrome: Chrome) {
    new BackgroundScriptMessages(this);
  }

  get runtime() {
    return this.chrome.runtime;
  }

  get browserAction() {
    return this.chrome.browserAction;
  }

  setExtensionActive(comments: number, tabId: number) {
    const text = comments >= 100 ? '99+' : comments.toString();

    this.browserAction.setBadgeText({ text, tabId });
    this.browserAction.setBadgeBackgroundColor({ color: this.color, tabId });
    (this.browserAction as any).setBadgeTextColor?.({ color: '#FFFFFF', tabId });
  }

  unsetExtensionActive(tabId: number) {
    this.browserAction.setBadgeText({ text: '', tabId });
  }

  async getExtensionConfig(): Promise<ExtensionConfig> {
    const defaultConfig: ExtensionConfig = { mediaIntegrations: {} };

    // await this.setExtensionConfig(defaultConfig);

    const config = await new Promise<ExtensionConfig | undefined>((resolve) => {
      this.chrome.storage.local.get((result) => {
        resolve(result.config);
      });
    });

    if (config) {
      return config;
    }

    await this.setExtensionConfig(defaultConfig);

    return defaultConfig;
  }

  setExtensionConfig(config: ExtensionConfig) {
    return new Promise<void>((resolve) => {
      this.chrome.storage.local.set({ config }, resolve);
    });
  }
}

new BackgroundScript(chrome);
