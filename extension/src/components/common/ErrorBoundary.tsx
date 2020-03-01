import React, { ErrorInfo } from 'react';

import env from 'src/utils/env';

import Box from './Box';
import Flex from './Flex';
import Text from './Text';

import * as Sentry from '@sentry/browser';

const { NODE_ENV } = env;

// disable react's logging is not possible for now
// https://github.com/facebook/react/issues/15069

const GenericErrorView: React.FC = () => (
  <>
    <div style={{ display: 'relative', minHeight: 200 }} />
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }}
    >
      <Text variant="title" align="center">
        Une erreur s'est produite... x(
      </Text>
      <Box my={42}>
        <Text align="center">
          Réessayez plus tard ! ¯\_(ツ)_/¯
        </Text>
      </Box>
    </Flex>
  </>
);

type ErrorBoundaryProps = {
  children: React.ReactNode;
};

type ErrorBoundaryState = {
  error: Error;
};

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {

  public state: ErrorBoundaryState = {
    error: null,
  };

  public static getDerivedStateFromError(error: Error) {
    return { error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (['development', 'test'].includes(NODE_ENV))
      console.error(error, errorInfo);

    if (NODE_ENV === 'production') {
      Sentry.withScope(scope => {
        scope.setExtras(errorInfo);
        Sentry.captureException(error);
      });
    }
  }

  public render() {
    const { children } = this.props;
    const { error } = this.state;

    if (error !== null)
      return <GenericErrorView />;

    return children;
  }
}

export default ErrorBoundary;
