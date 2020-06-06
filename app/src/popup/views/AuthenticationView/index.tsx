import React from 'react';

import AuthenticationForm from 'src/components/AuthenticationForm';
import { useUser } from 'src/contexts/UserContext';

import { Box } from '@material-ui/core';

const AuthenticationView: React.FC = () => {
  const [, setUser] = useUser();

  return (
    <Box paddingTop={4}>
      <AuthenticationForm urlPrefix="/popup" onAuthenticated={setUser} />
    </Box>
  );
};

export default AuthenticationView;
