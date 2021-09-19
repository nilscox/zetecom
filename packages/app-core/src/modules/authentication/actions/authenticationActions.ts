import { AuthenticatedUser, AuthenticationField } from '../../../entities';
import { createAction } from '../../../store/createAction';

export { setUser } from '../../../store/normalize';

export const setAuthenticatedUser = (authenticatedUser: AuthenticatedUser) => {
  return createAction('setAuthenticatedUser', { authenticatedUser });
};

export const unsetAuthenticatedUser = () => {
  return createAction('unsetAuthenticatedUser');
};

export const setIsFetchingAuthenticatedUser = (isFetchingAuthenticatedUser: boolean) => {
  return createAction('setIsFetchingAuthenticatedUser', { isFetchingAuthenticatedUser });
};

export const setAuthenticationField = (field: AuthenticationField, value: string) => {
  return createAction('setAuthenticationField', { field, value });
};

export const setAuthenticationGlobalError = (error?: string) => {
  return createAction('setAuthenticationGlobalError', { error });
};

export const setAuthenticationFieldError = (field: AuthenticationField, error?: string) => {
  return createAction('setAuthenticationFieldError', { field, error });
};

export const setIsAuthenticating = (isAuthenticating: boolean) => {
  return createAction('setIsAuthenticating', { isAuthenticating });
};

export const setIsChangingPassword = (isChangingPassword: boolean) => {
  return createAction('setIsChangingPassword', { isChangingPassword });
};

export type AuthenticationActions = ReturnType<
  | typeof setAuthenticatedUser
  | typeof unsetAuthenticatedUser
  | typeof setIsFetchingAuthenticatedUser
  | typeof setAuthenticationField
  | typeof setAuthenticationGlobalError
  | typeof setAuthenticationFieldError
  | typeof setIsAuthenticating
  | typeof setIsChangingPassword
>;
