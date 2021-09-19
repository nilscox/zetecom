import { AppState } from '../AppState';
import { Reducer } from '../types';

export const authenticatedUserReducer: Reducer<AppState['authenticatedUser']> = (
  state,
  action,
): AppState['authenticatedUser'] => {
  if (action.type === 'setAuthenticatedUser') {
    return {
      ...state,
      user: {
        id: action.payload.authenticatedUser.id,
        email: action.payload.authenticatedUser.email,
        signupDate: action.payload.authenticatedUser.signupDate,
        role: action.payload.authenticatedUser.role,
      },
    };
  }

  if (action.type === 'unsetAuthenticatedUser') {
    return {
      ...state,
      user: undefined,
    };
  }

  if (action.type === 'setIsFetchingAuthenticatedUser') {
    return {
      ...state,
      isFetchingAuthenticatedUser: action.payload.isFetchingAuthenticatedUser,
    };
  }

  if (action.type === 'setIsChangingPassword') {
    return {
      ...state,
      isChangingPassword: action.payload.isChangingPassword,
    };
  }

  return state;
};
