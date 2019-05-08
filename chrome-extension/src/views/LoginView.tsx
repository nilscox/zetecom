import React from 'react';

import ViewTitle from '../components/ViewTitle';
import Form from '../components/Form';

const LoginView: React.FC = () => (
  <>
    <ViewTitle title="CDV" subTitle="Login" />
    <Form
      fields={{
        email: { type: 'email', placeholder: 'Email' },
        password: { type: 'password', placeholder: 'Password' }
      }}
      submitButtonValue="Connexion"
    />
  </>
);

export default LoginView;
