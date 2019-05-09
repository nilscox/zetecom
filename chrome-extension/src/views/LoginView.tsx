import React from 'react';

import Typography from '../components/Typography';
import Form from '../components/Form';
import { ViewProps } from '../Popup';

const LoginView: React.FC<ViewProps> = () => (
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
    />
  </>
);

export default LoginView;
