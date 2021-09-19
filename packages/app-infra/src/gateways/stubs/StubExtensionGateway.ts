/* eslint-disable no-console */

import { ExtensionConfig, ExtensionGateway, IntegrationState } from '@zetecom/app-core';

export class StubExtensionGateway implements ExtensionGateway {
  setExtensionActive(commentsAreaId: string, commentsCount: number): void {
    console.log('setExtensionActive', { commentsAreaId, commentsCount });
  }

  focusApp(): void {
    console.log('focusApp');
  }

  async getIntegrationState(): Promise<IntegrationState> {
    return { available: false, loaded: false };
  }

  private extensionConfig: ExtensionConfig = {
    mediaIntegrations: {},
  };

  async getExtensionConfig(): Promise<ExtensionConfig> {
    return this.extensionConfig;
  }

  setExtensionConfig(config: ExtensionConfig): void {
    console.log('setExtensionConfig', { config });
    this.extensionConfig = config;
  }
}
