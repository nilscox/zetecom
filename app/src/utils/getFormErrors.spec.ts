import { AxiosError } from 'axios';

import getFormErrors, { FormErrorHandlers } from './getFormErrors';

const makeAxiosError = (status: number, data: Record<string, unknown>) => {
  return {
    response: {
      status,
      data,
    },
  } as AxiosError;
};

describe('useFormErrors', () => {
  const error = makeAxiosError(400, {
    name: {
      error: {
        unique: 'this field must be unique',
      },
      other: 'other error',
    },
  });

  it('handle a field error', () => {
    const handlers: FormErrorHandlers = {
      400: {
        name: {
          error: {
            unique: ['field', 'Ce champ doit être unique'],
          },
        },
      },
    };

    expect(getFormErrors(error, handlers)).toMatchObject([null, { field: 'Ce champ doit être unique' }, null]);
  });

  it('handle multiple fields errors', () => {
    const handlers: FormErrorHandlers = {
      400: {
        name: {
          error: {
            unique: ['field', 'Ce champ doit être unique'],
          },
          other: ['some', 'error'],
        },
      },
    };

    expect(getFormErrors(error, handlers)).toMatchObject([
      null,
      { field: 'Ce champ doit être unique', some: 'error' },
      null,
    ]);
  });

  it('not override fields errors', () => {
    const handlers: FormErrorHandlers = {
      400: {
        name: {
          error: {
            unique: ['field', 'Ce champ doit être unique'],
          },
          other: ['field', 'error'],
        },
      },
    };

    expect(getFormErrors(error, handlers)).toMatchObject([null, { field: 'Ce champ doit être unique' }, null]);
  });

  it('handle a global form error', () => {
    const handlers: FormErrorHandlers = {
      400: {
        name: {
          error: {
            unique: "Le chapeau n'est pas magique",
          },
        },
      },
    };

    expect(getFormErrors(error, handlers)).toMatchObject(["Le chapeau n'est pas magique", {}, null]);
  });

  it('handle a field error with a function', () => {
    const handlers: FormErrorHandlers = {
      400: {
        name: {
          error: {
            unique: (message: string) => ['field', message],
          },
        },
      },
    };

    expect(getFormErrors(error, handlers)).toMatchObject([null, { field: 'this field must be unique' }, null]);
  });

  it('handle a form error with a function', () => {
    const handlers: FormErrorHandlers = {
      400: {
        name: {
          error: {
            unique: () => "Le chapeau n'est pas magique",
          },
        },
      },
    };

    expect(getFormErrors(error, handlers)).toMatchObject(["Le chapeau n'est pas magique", {}, null]);
  });

  it('handle multiple errors at the same time', () => {
    const error = makeAxiosError(400, {
      name: {
        error: {
          unique: 'this field must be unique',
        },
        other: 'other error',
      },
      age: {
        tooOld: 'you are too old for this',
      },
    });

    const handlers: FormErrorHandlers = {
      400: {
        name: {
          error: {
            unique: ['field1', 'error1'],
          },
          other: 'form error',
        },
        age: () => ['field2', 'error2'],
      },
    };

    expect(getFormErrors(error, handlers)).toMatchObject(['form error', { field1: 'error1', field2: 'error2' }, null]);
  });

  it('handle unhandled errors', () => {
    const handlers: FormErrorHandlers = {
      400: {
        name: {
          error: {
            solo: ['field1', 'error1'],
          },
        },
      },
    };

    expect(getFormErrors(error, handlers)).toMatchObject([null, {}, error]);
  });
});
