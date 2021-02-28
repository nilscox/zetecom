import React from 'react';

import styled from '@emotion/styled';
import axios from 'axios';
import { useMutation } from 'react-query';
import { Redirect, useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';

import UserAvatarNick from 'src/components/domain/UserAvatarNick/UserAvatarNick';
import Box from 'src/components/elements/Box/Box';
import Button from 'src/components/elements/Button/Button';
import Collapse from 'src/components/layout/Collapse/Collapse';
import { useSetUser, useUser } from 'src/contexts/userContext';
import ChangePasswordField from 'src/extension/Popup/AuthenticatedView/ChangePasswordField';
import useDateFormat from 'src/hooks/useDateFormat';
import { spacing } from 'src/theme';

const UserInfo = styled.div`
  margin: ${spacing(2, 0)};
`;

const LogoutButton = styled(Button)`
  margin: ${spacing(4)} auto 0;
  display: block;
`;

const AuthenticatedView: React.FC = () => {
  const format = useDateFormat('DD MM YYYY');
  const user = useUser();
  const setUser = useSetUser();
  const location = useLocation();
  const history = useHistory();

  const isChangingPassword = location.hash === '#change-password';

  const { mutate: onLogout, isLoading: isLoggingOut } = useMutation(() => axios.post('/api/auth/logout'), {
    onSuccess: () => setUser(null),
  });

  if (!user) {
    return <Redirect to="/popup/connexion" />;
  }

  return (
    <>
      <UserInfo>
        <UserAvatarNick user={user} />
      </UserInfo>

      <UserInfo>Email : {user.email}</UserInfo>

      <UserInfo>Inscrit.e depuis le : {format(user.signupDate)}</UserInfo>

      <Collapse in={isChangingPassword}>
        <Box mb={2}>
          <ChangePasswordField onPasswordChanged={() => history.push('#')} />
        </Box>
      </Collapse>

      <Link to={'#' + (isChangingPassword ? '' : 'change-password')}>Changer de mot de passe</Link>

      <LogoutButton loading={isLoggingOut} onClick={() => onLogout()}>
        Déconnexion
      </LogoutButton>
    </>
  );
};

export default AuthenticatedView;
