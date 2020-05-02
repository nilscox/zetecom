import React, { useState } from 'react';

import { AxiosError, AxiosRequestConfig } from 'axios';
import { RouteComponentProps } from 'react-router-dom';

import Box from 'src/components/common/Box';
import Text from 'src/components/common/Text';
import useAxios from 'src/hooks/use-axios';
import { useTheme } from 'src/utils/Theme';

import Form, { GlobalErrorHandler, useFormErrors } from '../components/Form';

const getGlobalError: GlobalErrorHandler = (error: AxiosError) => {
  if (!error || !error.response)
    return;

  return 'Quelque chose c\'est mal passé, veuillez réessayer.';
};

const EmailLoginHeader = () => {
  const { sizes: { medium } } = useTheme();

  return (
    <Box
      my={10}
      pb={medium}
      style={{
        borderBottom: '1px solid #ccc',
        textAlign: 'center',
      }}
    >
      <Text variant="subtitle" style={{ color: 'inherit' }}>Connexion par email</Text>
    </Box>
  );
};

const EmailLoginView: React.FC<RouteComponentProps> = () => {
  const { sizes: { big } } = useTheme();

  const [email, setEmail] = useState('violaine');

  const opts: AxiosRequestConfig = { method: 'POST', url: '/api/auth/ask-email-login' };
  const [{ loading, error, status }, askEmailLogin] = useAxios(opts, undefined, { manual: true });

  const [globalError,, resetErrors] = useFormErrors(error, getGlobalError, () => ({}));

  const onSubmit = (values: { [field: string]: string }) => {
    setEmail(values.email);

    askEmailLogin({
      data: {
        email: values.email,
      },
    });
  };

  const isFormValid = (values: { [field: string]: string }) => {
    return values.email.length > 0;
  };

  if (status(204)) {
    return (
      <>
        <EmailLoginHeader />

        <Box px={40} my={big}>
          <Text>L'email de connexion a bien été envoyé à l'adresse { email }.</Text>
        </Box>
      </>
    );
  }

  return (
    <>
      <EmailLoginHeader />

      <Box px={40}>
        <Box my={big}>
          <Text>Pour recevoir un email de connexion, entrer l'adresse email de votre compte.</Text>
        </Box>

        <Form
          loading={loading}
          globalError={globalError}
          submitButtonValue="Envoyer"
          isValid={isFormValid}
          onChange={resetErrors}
          onSubmit={onSubmit}
          fields={{
            email: {
              type: 'email',
              placeholder: 'Email',
            },
          }}
        />
      </Box>
    </>
  );
};

export default EmailLoginView;
