import { AppState } from '../../../store';

export const selectExtensionConfig = (state: AppState) => state.extension.config;
