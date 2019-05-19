import React, { useContext, useState } from 'react';

import ViewHeader from '../components/ViewHeader';
import Typography from '../components/Typography';
import Form from '../components/Form';
import WormholeContext from '../contexts/WormholeContext';
import { RouteComponentProps } from 'react-router';

const LoginView: React.FC<RouteComponentProps> = ({ history }) => {
  const [loading, setLoading] = useState(false);
  const wormhole = useContext(WormholeContext);

  const loginSubmit = (values: { [field: string]: string }) => {
    if (!wormhole)
      return;

    setLoading(true);

    wormhole.onEvent('LOGIN_SUCCESS', () => history.push('/logout'));
    wormhole.onEvent('LOGIN_FAILURE', () => setLoading(false));

    wormhole.postEvent({
      type: 'LOGIN',
      email: values.email,
      password: values.password,
    });
  };

  return (
    <>
      <ViewHeader />
      <div style={{ padding: '0 40px' }}>
        <Typography>
          Connectez-vous sur CDV pour interagir avec le reste de la communauté.
        </Typography>
        <Form
          fields={{
            email: { type: 'email', placeholder: 'Email' },
            password: { type: 'password', placeholder: 'Mot de passe' },
          }}
          submitButtonValue="Connexion"
          isLoading={loading}
          onSubmit={loginSubmit}
        />
      </div>
    </>
  );
};

export default LoginView;
