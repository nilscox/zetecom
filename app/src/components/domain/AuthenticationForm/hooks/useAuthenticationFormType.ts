import { useCallback } from 'react';

import { useRouteMatch } from 'react-router-dom';

import { AuthenticationFormType } from 'src/components/domain/AuthenticationForm/AuthenticationForm';

const useAuthenticationFormType = () => {
  const matches = {
    login: useRouteMatch({ path: '/connexion' }),
    signup: useRouteMatch({ path: '/inscription' }),
    emailLogin: useRouteMatch({ path: '/connexion-par-email' }),
  };

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const match = Object.entries(matches).find(([, v]) => v !== null)!;
  const formType = match[0] as AuthenticationFormType;

  const getForFormType = useCallback(
    <T extends unknown>(options: Record<AuthenticationFormType, T>) => options[formType],
    [formType],
  );

  return [formType, getForFormType] as const;
};

export default useAuthenticationFormType;
