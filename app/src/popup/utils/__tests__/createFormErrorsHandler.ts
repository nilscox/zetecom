import { AxiosError } from 'axios';

import { createFormErrorsHandler } from '../createFormErrorsHandler';

describe('createFormErrorHandler', () => {

  const makeError = (fields?: { [key: string]: { [constraint: string]: string } | string }) => {
    return {
      response: {
        data: fields,
      },
    } as AxiosError;
  };

  const useFormErrors = createFormErrorsHandler({
    email: (error) => {
      const fields = error.response.data;

      if (!fields?.email) {
        return;
      }

      if (fields.email.isEmail) {
        return 'Format d\'adresse email non valide';
      }
    },
    password: (error) => {
      const fields = error.response.data;

      if (!fields?.password) {
        return;
      }

      if (fields.password.minLength) {
        return 'Mot de passe trop court';
      }
    },
  },
  (error) => {
    if (error.response.data?.message === 'INVALID_CREDENTIALS') {
      return 'Combinaison email / mot de passe non valide';
    }
  });

  it('should return undefined when the error is undefined', () => {
    expect(useFormErrors()).toBe(undefined);
  });

  it('should handle a sigle field error', () => {
    expect(useFormErrors(makeError({ email: { isEmail: ' ' } }))).toMatchObject({
      fieldErrors: {
        email: 'Format d\'adresse email non valide',
      },
    });
  });

  it('should handle another sigle field error', () => {
    expect(useFormErrors(makeError({ password: { minLength: ' ' } }))).toMatchObject({
      fieldErrors: {
        password: 'Mot de passe trop court',
      },
    });
  });

  it('should handle multiple fields errors', () => {
    expect(useFormErrors(makeError({ email: { isEmail: ' ' }, password: { minLength: ' ' } }))).toMatchObject({
      fieldErrors: {
        email: 'Format d\'adresse email non valide',
        password: 'Mot de passe trop court',
      },
    });
  });

  it('should handle a global error', () => {
    expect(useFormErrors(makeError({ message: 'INVALID_CREDENTIALS' }))).toMatchObject({
      globalError: 'Combinaison email / mot de passe non valide',
    });
  });

  it('should handle everything in the same time', () => {
    expect(useFormErrors(
      makeError({ email: { isEmail: ' ' }, password: { minLength: ' ' }, message: 'INVALID_CREDENTIALS' })
    )).toMatchObject({
      fieldErrors: {
        email: 'Format d\'adresse email non valide',
        password: 'Mot de passe trop court',
      },
      globalError: 'Combinaison email / mot de passe non valide',
    });
  });

  it('should handle unhandled errors', () => {
    expect(useFormErrors(makeError({ whoops: 'true' }))).toMatchObject({
      unhandledError: { response: { data: { whoops: 'true' } } },
    });
  });

});
