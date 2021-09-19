import { AppState } from '../AppState';
import { Reducer } from '../types';

export const authenticationFormReducer: Reducer<AppState['authenticationForm']> = (
  state,
  action,
): AppState['authenticationForm'] => {
  if (action.type === 'setAuthenticationField') {
    const { field, value } = action.payload;

    return {
      ...state,
      values: { ...state.values, [field]: value },
    };
  }

  if (action.type === 'setAuthenticationFieldError') {
    const { field, error } = action.payload;

    return {
      ...state,
      fieldErrors: { ...state.fieldErrors, [field]: error },
    };
  }

  if (action.type === 'setAuthenticationGlobalError') {
    const { error } = action.payload;

    return {
      ...state,
      globalError: error,
    };
  }

  if (action.type === 'setIsAuthenticating') {
    return {
      ...state,
      isSubmitting: action.payload.isAuthenticating,
    };
  }

  return state;
};
