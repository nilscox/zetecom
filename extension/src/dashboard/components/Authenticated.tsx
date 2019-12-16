import React from 'react';

import { Redirect } from 'react-router-dom';

import { useCurrentUser } from 'src/hooks/use-user';

const Authenticated: React.FC = ({ children }) => {
  const user = useCurrentUser();

  if (user === undefined)
    return null;

  if (user === null)
    return <Redirect to="/connexion" />;

  return <>{ children }</>;
};

export default Authenticated;
