import { expect } from 'earljs';

import { AuthenticationError, AuthenticationField } from '../../../../entities';
import { MemoryStore } from '../../../../store/MemoryStore';
import { selectAuthenticationFieldError, selectAuthenticationGlobalError } from '../../selectors';

import { handleAuthenticationError } from './handleAuthenticationError';

const { email, password, nick } = AuthenticationField;

describe('handleAuthenticationError', () => {
  let store: MemoryStore;

  beforeEach(() => {
    store = new MemoryStore();
  });

  const execute = (error: AuthenticationError) => {
    store.dispatch(handleAuthenticationError(error));
  };

  const selectFieldError = (field: AuthenticationField) => {
    return store.select(selectAuthenticationFieldError, field);
  };

  const selectGlobalError = () => {
    return store.select(selectAuthenticationGlobalError);
  };

  it('throws if the error is not an authentication error', () => {
    expect(() => store.dispatch(handleAuthenticationError(new Error('oops')))).toThrow('oops');
  });

  it('handles multiple authentication errors', () => {
    execute(
      new AuthenticationError(400, {
        nick: { minLength: 'error' },
        message: 'PASSWORD_UNSECURE',
      }),
    );

    expect(selectFieldError(email)).toEqual(undefined);
    expect(selectFieldError(password)).toEqual("Ce mot de passe n'est pas assez sécurisé");
    expect(selectFieldError(nick)).toEqual('Ce pseudo est trop court');
  });

  const testError = (
    status: number,
    body: Record<string, unknown>,
    field: AuthenticationField | undefined,
    message: string,
  ) => {
    execute(new AuthenticationError(status, body));

    if (field) {
      expect(selectFieldError(field)).toEqual(message);
    } else {
      expect(selectGlobalError()).toEqual(message);
    }
  };

  it('handles all errors', () => {
    testError(400, { email: { isEmail: 'error' } }, email, "Format d'adresse email non valide");
    testError(400, { message: 'EMAIL_ALREADY_EXISTS' }, email, 'Cette adresse est déjà utilisée');

    testError(400, { password: { minLength: 'error' } }, password, 'Ce mot de passe est trop court');
    testError(400, { password: { maxLength: 'error' } }, password, 'Ce mot de passe est trop long :o');
    testError(400, { message: 'PASSWORD_UNSECURE' }, password, "Ce mot de passe n'est pas assez sécurisé");

    testError(400, { nick: { minLength: 'error' } }, nick, 'Ce pseudo est trop court');
    testError(400, { nick: { maxLength: 'error' } }, nick, 'Ce pseudo est trop long');
    testError(400, { message: 'NICK_ALREADY_EXISTS' }, nick, 'Ce pseudo est déjà utilisé');
    testError(401, { message: 'EMAIL_NOT_VALIDATED' }, email, "Votre adresse email n'a pas été validée");

    testError(401, { message: 'INVALID_CREDENTIALS' }, undefined, 'Combinaison email / mot de passe non valide');

    testError(403, {}, undefined, 'Vous êtes déjà connecté(e)');
  });

  it('falls back to a generic error message', () => {
    execute(new AuthenticationError(500, {}));

    expect(selectGlobalError()).toEqual("Une erreur s'est produite");
  });
});
