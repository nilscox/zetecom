import React from 'react';

import styled from '@emotion/styled';
import {
  AuthenticatedUser,
  AuthenticationField,
  changePassword,
  logout,
  selectAuthenticatedUser,
  selectAuthenticationField,
  selectAuthenticationFieldError,
  selectPasswordFieldVisible,
} from '@zetecom/app-core';
import { setAuthenticationField } from '@zetecom/app-core/modules/authentication/actions';
import { setChangePasswordFieldVisible } from '@zetecom/app-core/modules/extension/actions';
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

  const formatDate = useDateFormat(DATE_FORMAT_DAY);

  return (
    <Flex direction="column" rowGap={4}>
      <AvatarNick user={user} />

      <div>Email : {user.email}</div>

      <div>
        Inscrit.e depuis le <em>{formatDate(user.signupDate)}</em>
      </div>

      <ChangePasswordField />

      <Button marginX="auto" onClick={() => dispatch(logout('popup'))}>
        Déconnexion
      </Button>
    </Flex>
  );
};

const ChangePasswordField: React.FC = () => {
  const dispatch = useDispatch();

  const fieldVisible = useAppSelector(selectPasswordFieldVisible);
  const password = useAppSelector(selectAuthenticationField, AuthenticationField.password);
  const error = useAppSelector(selectAuthenticationFieldError, AuthenticationField.password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(changePassword(password));
  };

  const handleTextChange = (value: string) => {
    dispatch(setAuthenticationField(AuthenticationField.password, value));
  };

  const handleToggleFieldVisibility = () => {
    dispatch(setChangePasswordFieldVisible(!fieldVisible));
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
            value={password}
            onTextChange={handleTextChange}
          />
        </Box>
      </Collapse>

      <ChangePasswordLink fontSize={1} role="link" onClick={handleToggleFieldVisibility}>
        Changer de mot de passe
      </ChangePasswordLink>
    </div>
  );
};

const ChangePasswordLink = styled(Text)`
  cursor: pointer;
  text-decoration: underline;
`;
