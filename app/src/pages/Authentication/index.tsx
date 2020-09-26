import React, { useCallback } from 'react';

import { Box } from '@material-ui/core';

import AuthenticationForm from 'src/components/AuthenticationForm';
import { useUser } from 'src/contexts/UserContext';
import { User } from 'src/types/User';

const Authentication: React.FC = () => {
  const [, setUser] = useUser();

  const onAuthenticated = useCallback((user: User) => {
    if (!user.requiresEmailValidation)
      setUser(user);
  }, [setUser]);

  return (
    <Box margin="auto" maxWidth={480} marginTop={16}>
      <AuthenticationForm formErrorConsistentHeight onAuthenticated={onAuthenticated} />
    </Box>
  );
};

export default Authentication;
