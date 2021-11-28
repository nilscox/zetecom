import { AppState } from '../AppState';
import { Reducer } from '../types';

export const extensionReducer: Reducer<AppState['extension']> = (state, action): AppState['extension'] => {
  if (action.type === 'setIntegrationState') {
    return {
      ...state,
      integrationState: action.payload.integrationState,
    };
  }

  if (action.type === 'setExtensionConfig') {
    return {
      ...state,
      config: action.payload.extensionConfig,
    };
  }

  if (action.type === 'setChangePasswordFieldVisible') {
    return {
      ...state,
      passwordFieldVisible: action.payload.visible,
    };
  }

  return state;
};
