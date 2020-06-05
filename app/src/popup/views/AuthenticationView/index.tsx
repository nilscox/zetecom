import React from 'react';

import { Redirect, useHistory } from 'react-router-dom';

import AuthenticationForm from 'src/components/AuthenticationForm';
import { useUser } from 'src/contexts/UserContext';
import { User } from 'src/types/User';

import { Box } from '@material-ui/core';

const AuthenticationView: React.FC = () => {
  const [currentUser, setUser] = useUser();
  const history = useHistory();

  const handleAuthenticated = (user: User) => {
    setUser(user);
    history.push('/popup');
  };

  if (currentUser)
    return <Redirect to="/popup" />;

  return (
    <Box paddingTop={4}>
      <AuthenticationForm urlPrefix="/popup" onAuthenticated={handleAuthenticated} />
    </Box>
  );
};

export default AuthenticationView;
