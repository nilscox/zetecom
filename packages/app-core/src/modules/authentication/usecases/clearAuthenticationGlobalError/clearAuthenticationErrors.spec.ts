import { expect } from 'earljs';

import { AuthenticationField } from '../../../../entities';
import { MemoryStore } from '../../../../store/MemoryStore';
import { setAuthenticationFieldError, setAuthenticationGlobalError } from '../../actions';
import { selectAuthenticationFieldError, selectAuthenticationGlobalError } from '../../selectors';

import { clearAuthenticationErrors } from './clearAuthenticationErrors';

describe('clearAuthenticationErrors', () => {
  let store: MemoryStore;

  beforeEach(() => {
    store = new MemoryStore();
  });

  it('clear the authentication global error', () => {
    store.dispatch(setAuthenticationFieldError(AuthenticationField.email, 'error'));
    store.dispatch(setAuthenticationGlobalError('error'));

    store.dispatch(clearAuthenticationErrors());

    expect(store.select(selectAuthenticationFieldError, AuthenticationField.email)).toEqual(undefined);
    expect(store.select(selectAuthenticationGlobalError)).toEqual(undefined);
  });
});
