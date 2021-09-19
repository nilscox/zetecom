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

  return state;
};
