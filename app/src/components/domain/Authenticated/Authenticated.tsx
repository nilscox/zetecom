import React from 'react';

import { Redirect, useLocation } from 'react-router';
import { toast } from 'react-toastify';

import { useUser } from 'src/contexts/userContext';

const Authenticated: React.FC = ({ children }) => {
  const user = useUser();
  const location = useLocation();

  if (!user) {
    toast.warn('Vous devez être connecté.e pour accéder à cette page.');

    return <Redirect to={`/connexion?next=${location.pathname}`} />;
  }

  return <>{children}</>;
};

export default Authenticated;
