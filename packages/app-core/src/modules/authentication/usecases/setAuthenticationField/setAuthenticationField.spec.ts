import { expect } from 'earljs';

import { AuthenticationField } from '../../../../entities';
import { MemoryStore } from '../../../../store/MemoryStore';
import { setAuthenticationFieldError, setAuthenticationGlobalError } from '../../actions';
import {
  selectAuthenticationField,
  selectAuthenticationFieldError,
  selectAuthenticationGlobalError,
} from '../../selectors';

import { setAuthenticationField } from './setAuthenticationField';

const { email } = AuthenticationField;

describe('setAuthenticationField', () => {
  let store: MemoryStore;

  beforeEach(() => {
    store = new MemoryStore();
  });

  it('sets a field of the authentication form', () => {
    store.dispatch(setAuthenticationField(email, 'email@domain.tld'));
    expect(store.select(selectAuthenticationField, email)).toEqual('email@domain.tld');
  });

  it('clears the field and global errors', () => {
    store.dispatch(setAuthenticationGlobalError('oops'));
    store.dispatch(setAuthenticationFieldError(email, 'oops'));

    store.dispatch(setAuthenticationField(email, 'email@domain.tld'));

    expect(store.select(selectAuthenticationGlobalError)).toEqual(undefined);
    expect(store.select(selectAuthenticationFieldError, email)).toEqual(undefined);
  });
});
