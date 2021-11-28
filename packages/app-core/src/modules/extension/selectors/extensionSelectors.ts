import { AppState } from '../../../store';

export const selectExtensionConfig = (state: AppState) => {
  return state.extension.config;
};

export const selectPasswordFieldVisible = (state: AppState) => {
  return state.extension.passwordFieldVisible;
};
