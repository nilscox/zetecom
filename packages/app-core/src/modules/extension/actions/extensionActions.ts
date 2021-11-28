import { ExtensionConfig, IntegrationState } from '../../../entities';
import { createAction } from '../../../store/createAction';

export const setIntegrationState = (integrationState: IntegrationState) => {
  return createAction('setIntegrationState', { integrationState });
};

export const setExtensionConfig = (extensionConfig: ExtensionConfig) => {
  return createAction('setExtensionConfig', { extensionConfig });
};

export const setChangePasswordFieldVisible = (visible: boolean) => {
  return createAction('setChangePasswordFieldVisible', { visible });
};

export type ExtensionActions = ReturnType<
  typeof setIntegrationState | typeof setExtensionConfig | typeof setChangePasswordFieldVisible
>;
