import React from 'react';

import Form from '../components/Form';

const LoginView: React.FC = () => (
  <>
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
