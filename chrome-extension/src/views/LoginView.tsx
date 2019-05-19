import React, { useContext, useState, useEffect } from 'react';

import ViewHeader from '../components/ViewHeader';
import Typography from '../components/Typography';
import Form from '../components/Form';
import WormholeContext from '../contexts/WormholeContext';
import { RouteComponentProps } from 'react-router';

const LoginView: React.FC<RouteComponentProps> = () => {
  const [loading, setLoading] = useState(false);
  const wormhole = useContext(WormholeContext);

  useEffect(() => {
    if (!wormhole)
      return;

    wormhole.onEvent('LOGIN_SUCCESS', () => setLoading(false));
    wormhole.onEvent('LOGIN_FAILURE', () => setLoading(false));

    setLoading(false);
  }, []);

  const loginSubmit = (values: { [field: string]: string }) => {
    if (!wormhole)
      return;

    setLoading(true);

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
