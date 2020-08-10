import React, { ErrorInfo } from 'react';

import * as Sentry from '@sentry/browser';

import env from 'src/utils/env';

import Box from './Box';
import Flex from './Flex';
import Text from './Text';

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
          Réessayez plus tard !
        </Text>
      </Box>
    </Flex>
  </>
);

const DevErrorView: React.FC<{ error: Error; errorInfo: ErrorInfo }> = ({ error, errorInfo }) => (
  <div style={{ margin: 30 }}>
    <pre style={{ fontFamily: 'monospace', fontSize: 14 }}>{ error.stack.toString() } </pre>
    <hr />
    <pre style={{ fontFamily: 'monospace', fontSize: 12 }}>{ errorInfo.componentStack }</pre>
  </div>
);

type ErrorBoundaryProps = {
  children: React.ReactNode;
};

type ErrorBoundaryState = {
  error: Error;
  errorInfo: ErrorInfo;
};

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {

  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = {
      error: null,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo });

    if (NODE_ENV === 'production') {
      Sentry.withScope(scope => {
        scope.setExtras(errorInfo);
        Sentry.captureException(error);
      });
    }
  }

  render() {
    const { children } = this.props;
    const { error, errorInfo } = this.state;

    if (error !== null) {
      if (NODE_ENV === 'development')
        return <DevErrorView error={error} errorInfo={errorInfo} />;
      else
        return <GenericErrorView />;
    }

    return children;
  }
}

export default ErrorBoundary;
