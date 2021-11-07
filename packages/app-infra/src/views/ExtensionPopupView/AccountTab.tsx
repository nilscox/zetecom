import React, { useState } from 'react';

import styled from '@emotion/styled';
import {
  AuthenticatedUser,
  AuthenticationField,
  changePassword,
  logout,
  selectAuthenticatedUser,
  selectAuthenticationFieldError,
} from '@zetecom/app-core';
import { useDispatch } from 'react-redux';

import { AvatarNick } from '~/components/elements/Avatar/Avatar';
import { Button } from '~/components/elements/Button/Button';
import { Input } from '~/components/elements/Input/Input';
import { Text } from '~/components/elements/Text/Text';
import { Box } from '~/components/layout/Box/Box';
import { Collapse } from '~/components/layout/Collapse/Collapse';
import { Flex } from '~/components/layout/Flex/Flex';
import { useAppSelector } from '~/hooks/useAppSelector';
import useDateFormat, { DATE_FORMAT_DAY } from '~/hooks/useFormatDate';

export const AccountTab: React.FC = () => {
  const dispatch = useDispatch();

  const user = useAppSelector(selectAuthenticatedUser) as AuthenticatedUser;
  const changePasswordError = useAppSelector(selectAuthenticationFieldError, AuthenticationField.password);

  const formatDate = useDateFormat(DATE_FORMAT_DAY);

  return (
    <Flex direction="column" rowGap={4}>
      <AvatarNick user={user} />

      <div>Email : {user.email}</div>

      <div>
        Inscrit.e depuis le <em>{formatDate(user.signupDate)}</em>
      </div>

      <ChangePasswordField error={changePasswordError} onSubmit={(password) => dispatch(changePassword(password))} />

      <Button marginX="auto" onClick={() => dispatch(logout('popup'))}>
        Déconnexion
      </Button>
    </Flex>
  );
};

type ChangePasswordFieldProps = {
  error?: string;
  onSubmit: (password: string) => void;
};

const ChangePasswordField: React.FC<ChangePasswordFieldProps> = ({ error, onSubmit }) => {
  const [fieldVisible, setFieldVisible] = useState(false);
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(value);
  };

  return (
    <div>
      <Collapse open={fieldVisible}>
        <Box as="form" onSubmit={handleSubmit} marginBottom={2}>
          <Input
            type="password"
            placeholder="Nouveau mot de passe"
            consistentHeight
            error={error}
            value={value}
            onTextChange={setValue}
          />
        </Box>
      </Collapse>
      <ChangePasswordLink fontSize={1} role="link" onClick={() => setFieldVisible(!fieldVisible)}>
        Changer de mot de passe
      </ChangePasswordLink>
    </div>
  );
};

const ChangePasswordLink = styled(Text)`
  cursor: pointer;
  text-decoration: underline;
`;
