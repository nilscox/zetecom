import React, { useCallback } from 'react';

import { useHistory } from 'react-router-dom';

import AuthenticationForm from 'src/components/AuthenticationForm';
import { useUser } from 'src/contexts/UserContext';
import { User } from 'src/types/User';

import { Box } from '@material-ui/core';

const AuthenticationView: React.FC = () => {
  const [, setUser] = useUser();
  const history = useHistory();

  const onAuthenticated = useCallback((user: User) => {
    if (!user.requiresEmailValidation)
      setUser(user);

    history.push('/');
  }, [setUser, history]);

  return (
    <Box paddingTop={4}>
      <AuthenticationForm urlPrefix="/popup" onAuthenticated={onAuthenticated} />
    </Box>
  );
};

export default AuthenticationView;
