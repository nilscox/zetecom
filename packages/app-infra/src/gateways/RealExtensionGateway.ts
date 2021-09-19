import { ExtensionConfig, ExtensionGateway, IntegrationState } from '@zetecom/app-core';
import { History } from 'history';

export class RealExtensionGateway implements ExtensionGateway {
  private pageUrl: string | null;

  constructor(private readonly history: History) {
    const params = new URLSearchParams(this.history.location.search);

    this.pageUrl = params.get('pageUrl');
  }

  private async postMessage(message: Record<string, unknown>): Promise<void>;

  private async postMessage<T>(message: Record<string, unknown>, responseType: string): Promise<T>;

  private async postMessage<T>(message: Record<string, unknown>, responseType?: string): Promise<T | void> {
    if (!this.pageUrl) {
      throw new Error('cannot post message: pageUrl is not set');
    }

    if (window.parent === window) {
      throw new Error('cannot post message: window.parent === window');
    }

    window.parent.postMessage(message, this.pageUrl);

    if (responseType) {
      return this.awaitResponse(responseType);
    }
  }

  private async awaitResponse<T>(type: string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const timeout = setTimeout(() => reject(`timed out waiting for message with type = "${type}"`), 1000);

      window.addEventListener('message', function listener(message) {
        if (message.data?.type !== type) {
          return;
        }

        clearTimeout(timeout);
        window.removeEventListener('message', listener);

        resolve(message.data);
      });
    });
  }

  setExtensionActive(commentsAreaId: string, commentsCount: number): void {
    this.postMessage({ type: 'integrationLoaded', commentsAreaId, comments: commentsCount });
  }

  focusApp(): void {
    this.postMessage({ type: 'focusApp' });
  }

  async getIntegrationState(): Promise<IntegrationState> {
    const { state } = await this.postMessage<{ state: IntegrationState }>(
      { type: 'getIntegrationState' },
      'integrationState',
    );

    return state;
  }

  async getExtensionConfig(): Promise<ExtensionConfig> {
    const { config } = await this.postMessage<{ config: ExtensionConfig }>(
      { type: 'getExtensionConfig' },
      'extensionConfig',
    );

    return config;
  }

  setExtensionConfig(config: ExtensionConfig) {
    this.postMessage({ type: 'setExtensionConfig', config });
  }
}
