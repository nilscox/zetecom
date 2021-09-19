import { AuthenticatedUser, AuthenticationField } from '../../../entities';
import { AppState } from '../../../store/AppState';
import { selectUser } from '../../../store/normalize';

export const selectAuthenticatedUser = (state: AppState): AuthenticatedUser | undefined => {
  const {
    authenticatedUser: { user },
  } = state;

  if (!user) {
    return;
  }

  return {
    ...selectUser(state, user.id),
    ...user,
  };
};

export const selectIsAuthenticated = (state: AppState): boolean => {
  return selectAuthenticatedUser(state) !== undefined;
};

export const selectIsFetchingAuthenticatedUser = (state: AppState): boolean => {
  return state.authenticatedUser.isFetchingAuthenticatedUser;
};

export const selectIsChangingPassword = (state: AppState): boolean => {
  return state.authenticatedUser.isChangingPassword;
};

export const selectAuthenticationField = (state: AppState, field: AuthenticationField): string => {
  return state.authenticationForm.values[field];
};

export const selectAuthenticationFieldError = (state: AppState, field: AuthenticationField): string | undefined => {
  return state.authenticationForm.fieldErrors[field];
};

export const selectAuthenticationGlobalError = (state: AppState): string | undefined => {
  return state.authenticationForm.globalError;
};

export const selectHasAuthenticationError = (state: AppState): boolean => {
  for (const field of Object.values(AuthenticationField)) {
    if (selectAuthenticationFieldError(state, field) !== undefined) {
      return true;
    }
  }

  if (selectAuthenticationGlobalError(state) !== undefined) {
    return true;
  }

  return false;
};

export const selectIsAuthenticating = (state: AppState): boolean => {
  return state.authenticationForm.isSubmitting;
};
