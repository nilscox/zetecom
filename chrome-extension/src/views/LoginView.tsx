import React, { useContext } from 'react';

import ViewHeader from '../components/ViewHeader';
import Typography from '../components/Typography';
import Form from '../components/Form';
import WormholeContext from '../contexts/WormholeContext';
import { RouteComponentProps } from 'react-router';

const LoginView: React.FC<RouteComponentProps> = () => {
  const wormhole = useContext(WormholeContext);

  const loginSubmit = (values: { [field: string]: string }) => {
    if (!wormhole)
      return;

    wormhole.postEvent({
      type: 'LOGIN',
      email: values.email,
      password: values.password,
    });
  };

  return (
    <>
      <ViewHeader />
      <Typography>
        Connectez-vous sur CDV pour interagir avec le reste de la communauté.
      </Typography>
      <Form
        fields={{
          email: { type: 'email', placeholder: 'Email' },
          password: { type: 'password', placeholder: 'Mot de passe' },
        }}
        submitButtonValue="Connexion"
        onSubmit={loginSubmit}
      />
    </>
  );
};

export default LoginView;
