import React from 'react';

import { selectIsAuthenticated, selectIsFetchingAuthenticatedUser } from '@zetecom/app-core';
import { Redirect } from 'react-router-dom';

import { Async } from '~/components/layout/Async/Async';
import { useAppSelector } from '~/hooks/useAppSelector';

type AuthenticatedProps = {
  redirect?: string;
};

export const Authenticated: React.FC<AuthenticatedProps> = ({ redirect = '/connexion', children }) => {
  const isFetchingAuthenticatedUser = useAppSelector(selectIsFetchingAuthenticatedUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  if (!isAuthenticated) {
    return <Async loading={isFetchingAuthenticatedUser} render={() => <Redirect to={redirect} />} />;
  }

  return <>{children}</>;
};
