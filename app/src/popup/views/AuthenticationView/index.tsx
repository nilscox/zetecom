import React, { useCallback } from 'react';

import { Box } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import AuthenticationForm from 'src/components/AuthenticationForm';
import { useUser } from 'src/contexts/UserContext';
import { User } from 'src/types/User';

const AuthenticationView: React.FC = () => {
  const history = useHistory();
  const [, setUser] = useUser();

  const onAuthenticated = useCallback((user: User) => {
    if (user.requiresEmailValidation) {
      history.push('/popup/connexion');
    } else {
      setUser(user);
    }
  }, [setUser, history]);

  return (
    <Box paddingTop={4}>
      <AuthenticationForm urlPrefix="/popup" onAuthenticated={onAuthenticated} />
    </Box>
  );
};

export default AuthenticationView;
