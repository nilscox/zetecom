import React, { ReactNode, useState } from 'react';

import styled from '@emotion/styled';
import axios, { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

import Button from 'src/components/elements/Button/Button';
import Input from 'src/components/elements/Input/Input';
import { useTrackEvent } from 'src/contexts/trackingContext';
import track from 'src/domain/track';
import { spacing } from 'src/theme';
import getFormErrors, { FormErrorHandlers } from 'src/utils/getFormErrors';

const handlers: FormErrorHandlers = {
  400: {
    password: {
      minLength: ['password', 'Ce mot de passe est trop court.'],
      maxLength: ['password', 'Ce mot de passe est trop long... :o'],
    },
    message: ({ message }: { message: string }) => {
      if (message === 'PASSWORD_UNSECURE') {
        return ['password', "Ce mot de passe n'est pas assez sécurisé."];
      }
    },
  },
};

const Form = styled.form`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const SubmitButton = styled(Button)`
  margin: ${spacing(0, 2)};
`;

type ChangePasswordFieldProps = {
  onPasswordChanged: () => void;
};

const ChangePasswordField: React.FC<ChangePasswordFieldProps> = ({ onPasswordChanged }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<ReactNode>(null);

  const trackEvent = useTrackEvent();

  const { mutate } = useMutation((password: string) => axios.put('/api/auth/change-password', { password }), {
    onSuccess: () => {
      setPassword('');
      setError(null);
      toast.success('Votre mot de passe a bien été mis à jour');
      trackEvent(track.changePassword());
      onPasswordChanged();
    },
    onError: (error: AxiosError) => {
      const [, fieldsErrors, unhandledError] = getFormErrors(error, handlers);

      if (fieldsErrors.password) {
        setError(fieldsErrors.password);
      }

      if (unhandledError) {
        // eslint-disable-next-line no-console
        console.warn('unhandled change password error', unhandledError);
        setError("Une erreur s'est produite, votre mot de passe n'a pas pu être mis à jour.");
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(password);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <Input
          required
          type="password"
          placeholder="Nouveau mot de passe"
          error={error}
          value={password}
          onChange={e => {
            setError(null);
            setPassword(e.currentTarget.value);
          }}
        />
      </div>
      <SubmitButton type="submit" disabled={password.length === 0}>
        Valider
      </SubmitButton>
    </Form>
  );
};

export default ChangePasswordField;
