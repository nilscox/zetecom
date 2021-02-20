import { Reducer, useCallback, useReducer, useState } from 'react';

import { FieldsErrors, FormError, FormErrors } from 'src/utils/getFormErrors';

type SetAction = {
  type: 'set';
  field: string;
  error: string;
};

type ClearAction = {
  type: 'clear';
  field: string;
};

type ClearAllAction = {
  type: 'clearAll';
};

type Action = SetAction | ClearAction | ClearAllAction;

const reducer: Reducer<FormErrors[1], Action> = (state, action) => {
  if (action.type === 'set') {
    return { ...state, [action.field]: action.error };
  }

  if (action.type === 'clear') {
    return { ...state, [action.field]: undefined };
  }

  if (action.type === 'clearAll') {
    return {};
  }

  return state;
};

const useFormErrors = () => {
  const [formError, setFormError] = useState<FormErrors[0]>(null);
  const [fieldErrors, dispatch] = useReducer(reducer, {});

  const setFieldErrror = useCallback((field: string, error: string) => {
    dispatch({ type: 'set', field, error });
  }, []);

  const clearFieldError = useCallback((field: string) => {
    dispatch({ type: 'clear', field });
  }, []);

  const clearAllErrors = useCallback(() => {
    setFormError(null);
    dispatch({ type: 'clearAll' });
  }, []);

  const handleError = useCallback(
    (formError: FormError | null, fieldErrors: Partial<FieldsErrors>) => {
      clearAllErrors();

      if (formError) {
        setFormError(formError);
      }

      for (const [field, error] of Object.entries(fieldErrors)) {
        if (error) {
          setFieldErrror(field, error);
        }
      }
    },
    [clearAllErrors, setFormError, setFieldErrror],
  );

  return [
    {
      formError,
      fieldErrors,
    },
    {
      handleError,
      setFormError,
      setFieldErrror,
      clearFieldError,
      clearAllErrors,
    },
  ] as const;
};

export default useFormErrors;
