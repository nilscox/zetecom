import React from 'react';

import AuthenticationForm from 'src/components/AuthenticationForm';
import { useUser } from 'src/contexts/UserContext';

import { Box } from '@material-ui/core';

const Authentication: React.FC = () => {
  const [, setUser] = useUser();

  return (
    <Box margin="auto" maxWidth={480} marginTop={16}>
      <AuthenticationForm formErrorConsistentHeight onAuthenticated={setUser} />
    </Box>
  );
};

export default Authentication;
