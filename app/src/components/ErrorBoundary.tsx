import React from 'react';

import { Box, Typography } from '@material-ui/core';
import { ErrorBoundary as SentryErrorBoundary } from '@sentry/react';

const ErrorBoundary: React.FC = ({ children }) => (
  <SentryErrorBoundary
    fallback={({ resetError }) => (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        position="absolute"
        top={0}
        bottom={0}
        left={0}
        right={0}
        style={{ opacity: 0.8 }}
        onClick={resetError}
      >
        <Typography variant="h1" align="center">
          Une erreur s'est produite... x(
        </Typography>
        <Box my={10}>
          <Typography align="center">
            Réessayez plus tard !
          </Typography>
        </Box>
      </Box>
    )}
  >
    {children}
  </SentryErrorBoundary>
);

export default ErrorBoundary;
