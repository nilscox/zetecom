import { ExtensionConfig, IntegrationState } from '../entities';

export interface ExtensionGateway {
  setExtensionActive(commentsAreaId: string, commentsCount: number): void;
  focusApp(): void;
  getIntegrationState(): Promise<IntegrationState>;
  getExtensionConfig(): Promise<ExtensionConfig>;
  setExtensionConfig(config: ExtensionConfig): void;
}
