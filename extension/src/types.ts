export type IntegrationState = {
  available: boolean;
  loaded: boolean;
};

export type IntegrationType = 'integration' | 'overlay' | 'disabled';

export type ExtensionConfig = {
  mediaIntegrations: Record<string, IntegrationType>;
};

export type IntegrationStateResult = {
  type: 'integrationState';
  state: IntegrationState;
};

export type ExtensionConfigResult = {
  type: 'extensionConfig';
  config: ExtensionConfig;
};

type FocusApp = {
  type: 'focusApp';
};

type GetIntegrationState = {
  type: 'getIntegrationState';
};

type IntegrationLoaded = {
  type: 'integrationLoaded';
  commentsAreaId: number;
  comments: number;
};

type SetExtensionActive = {
  type: 'setExtensionActive';
  comments: number;
};

type UnsetExtensionActive = {
  type: 'unsetExtensionActive';
};

type GetExtensionConfig = {
  type: 'getExtensionConfig';
};

type SetExtensionConfig = {
  type: 'setExtensionConfig';
  config: ExtensionConfig;
};

export type BackgroundScriptMessage =
  | SetExtensionActive
  | UnsetExtensionActive
  | GetExtensionConfig
  | SetExtensionConfig;

export type PopupToBackgroundScriptMessage = GetExtensionConfig | SetExtensionConfig;
export type PopupToContentScriptMessage = FocusApp | GetIntegrationState;

export type PopupToIFrameMessage = IntegrationStateResult | ExtensionConfigResult;
export type IFrameToPopupMessage = FocusApp | GetIntegrationState | GetExtensionConfig | SetExtensionConfig;

export type IFrameToContentScriptMessage = IntegrationLoaded;
export type ContentScriptToIFrameMessage = IntegrationStateResult | ExtensionConfigResult;
