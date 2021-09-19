export enum IntegrationType {
  integration = 'integration',
  overlay = 'overlay',
  disabled = 'disabled',
}

export type ExtensionConfig = {
  mediaIntegrations: Record<string, IntegrationType>;
};
