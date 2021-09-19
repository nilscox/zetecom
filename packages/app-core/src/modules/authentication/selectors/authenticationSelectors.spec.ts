import { AuthenticationField, createAuthenticatedUser } from '../../../entities';
import { MemoryStore } from '../../../store/MemoryStore';
import {
  setAuthenticatedUser,
  setAuthenticationFieldError,
  setAuthenticationGlobalError,
  setIsAuthenticating,
  setIsChangingPassword,
  setUser,
} from '../actions';
import { setAuthenticationField } from '../index';

import {
  selectAuthenticatedUser,
  selectAuthenticationField,
  selectAuthenticationFieldError,
  selectAuthenticationGlobalError,
  selectHasAuthenticationError,
  selectIsAuthenticated,
  selectIsAuthenticating,
  selectIsChangingPassword,
} from './authenticationSelectors';

describe('userSelectors', () => {
  let store: MemoryStore;

  beforeEach(() => {
    store = new MemoryStore();
  });

  it('selectAuthenticatedUser', () => {
    const user = createAuthenticatedUser();

    store.dispatch(setUser(user));

    store.testState(selectAuthenticatedUser).expect({
      before: undefined,
      action: setAuthenticatedUser(user),
      after: user,
    });
  });

  it('selectIsAuthenticated', () => {
    const user = createAuthenticatedUser();

    store.dispatch(setUser(user));

    store.testState(selectIsAuthenticated).expect({
      before: false,
      action: setAuthenticatedUser(user),
      after: true,
    });
  });

  it('selectIsChangingPassword', () => {
    const user = createAuthenticatedUser();

    store.dispatch(setUser(user));

    store.testState(selectIsChangingPassword).expect({
      before: false,
      action: setIsChangingPassword(true),
      after: true,
    });
  });

  it('selectAuthenticationField', () => {
    for (const field of Object.values(AuthenticationField)) {
      store.testState(selectAuthenticationField, field).expect({
        before: '',
        action: setAuthenticationField(field, field),
        after: field,
      });
    }
  });

  it('selectAuthenticationGlobalError', () => {
    store.testState(selectAuthenticationGlobalError).expect({
      before: undefined,
      action: setAuthenticationGlobalError('oops'),
      after: 'oops',
    });
  });

  it('selectAuthenticationFieldError', () => {
    for (const field of Object.values(AuthenticationField)) {
      store.testState(selectAuthenticationFieldError, field).expect({
        before: undefined,
        action: setAuthenticationFieldError(field, field),
        after: field,
      });
    }
  });

  it('selectHasAuthenticationError', () => {
    store
      .testState(selectHasAuthenticationError)
      .expect({
        before: false,
        action: setAuthenticationFieldError(AuthenticationField.email, 'oops'),
        after: true,
      })
      .expect({
        action: () => {
          store.dispatch(setAuthenticationFieldError(AuthenticationField.email, undefined));
          store.dispatch(setAuthenticationGlobalError('oops'));
        },
        after: true,
      });
  });

  it('selectIsAuthenticating', () => {
    store.testState(selectIsAuthenticating).expect({
      before: false,
      action: setIsAuthenticating(true),
      after: true,
    });
  });
});
