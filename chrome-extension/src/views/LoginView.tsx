import React, { useContext } from 'react';

import Typography from '../components/Typography';
import Form from '../components/Form';
import { ViewProps } from '../Popup';
import WormholeContext from '../contexts/WormholeContext';

const LoginView: React.FC<ViewProps> = () => {
  const wormhole = useContext(WormholeContext);

  const loginSubmit = (values: { [field: string]: string }) => {
    if (!wormhole) return;

    wormhole.postEvent({
      type: 'LOGIN',
      email: values.email,
      password: values.password,
    });
  };

  return (
    <>
      <Typography>
        Connectez-vous sur CDV pour interagir avec le reste de la communauté.
      </Typography>
      <Form
        fields={{
          email: { type: 'email', placeholder: 'Email' },
          password: { type: 'password', placeholder: 'Mot de passe' }
        }}
        submitButtonValue="Connexion"
        onSubmit={loginSubmit}
      />
    </>
  );
};

export default LoginView;
