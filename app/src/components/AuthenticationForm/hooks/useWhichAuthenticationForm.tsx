import { useMemo } from 'react';

import { useRouteMatch } from 'react-router-dom';

import { Form } from '../types';

const useWhichAuthenticationForm = (urlPrefix?: string) => {
  const isSignup = !!useRouteMatch(`${urlPrefix}/inscription`);
  const isEmailLogin = !!useRouteMatch(`${urlPrefix}/connexion-par-email`);

  const form: Form = useMemo(() => {
    if (isSignup) {
      return 'signup';
    }

    if (isEmailLogin) {
      return 'emailLogin';
    }

    return 'login';
  }, [isSignup, isEmailLogin]);

  return form;
};

export default useWhichAuthenticationForm;
