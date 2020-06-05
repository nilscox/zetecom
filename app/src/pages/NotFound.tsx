import React from 'react';

import { Box, Typography } from '@material-ui/core';

const NotFound: React.FC = () => {
  return (
    <Box textAlign="center" marginTop={16}>
      <Typography>
        Cette page n'existe pas.
      </Typography>
    </Box>
  );
};

export default NotFound;
