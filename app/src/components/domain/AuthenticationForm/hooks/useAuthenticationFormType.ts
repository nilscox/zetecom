import { useCallback } from 'react';

import { useRouteMatch } from 'react-router-dom';

import { AuthenticationFormType } from 'src/components/domain/AuthenticationForm/AuthenticationForm';

const useAuthenticationFormType = () => {
  const matches = {
    login: useRouteMatch<{ 0?: string }>({ path: '(/popup)?/connexion' }),
    signup: useRouteMatch<{ 0?: string }>({ path: '(/popup)?/inscription' }),
    emailLogin: useRouteMatch<{ 0?: string }>({ path: '(/popup)?/connexion-par-email' }),
  };

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const match = Object.entries(matches).find(([, v]) => v !== null)!;
  const formType = match[0] as AuthenticationFormType;
  const isPopup = match[1]?.params?.[0] === '/popup';

  const getForFormType = useCallback(
    <T extends unknown>(options: Record<AuthenticationFormType, T>) => options[formType],
    [formType],
  );

  return [formType, isPopup, getForFormType] as const;
};

export default useAuthenticationFormType;
