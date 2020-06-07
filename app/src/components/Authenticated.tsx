import React from 'react';

import { Redirect, useLocation } from 'react-router-dom';

import { useCurrentUser } from 'src/contexts/UserContext';

import useQueryString from '../hooks/use-query-string';

const Authenticated: React.FC = ({ children }) => {
  const user = useCurrentUser();
  const location = useLocation();

  if (user === undefined)
    return null;

  if (user === null)
    return <Redirect to={`/connexion?next=${location.pathname}`} />;

  return <>{ children }</>;
};

export default Authenticated;

export const RedirectAuthenticated: React.FC<{ to?: string }> = ({ to }) => {
  const { next } = useQueryString();
  const user = useCurrentUser();

  if (user) {
    if (next && typeof next === 'string' && next.startsWith('/'))
      return <Redirect to={next} />;

    return <Redirect to={to} />;
  }

  return null;
};
