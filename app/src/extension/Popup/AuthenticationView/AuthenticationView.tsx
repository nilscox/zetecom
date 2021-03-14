/** @jsx jsx */
import React from 'react';

import { jsx } from '@emotion/react';
import { Redirect, useHistory } from 'react-router';

import AuthenticationContainer from 'src/containers/AuthenticationContainer/AuthenticationContainer';
import { useUser } from 'src/contexts/userContext';

const AuthenticationView: React.FC = () => {
  const history = useHistory();
  const user = useUser();

  if (user) {
    return <Redirect to="/popup/compte" />;
  }

  return (
    <AuthenticationContainer
      css={theme => ({ marginTop: theme.spacings[2] })}
      onAuthenticated={() => history.push('/popup/compte')}
    />
  );
};

export default AuthenticationView;
