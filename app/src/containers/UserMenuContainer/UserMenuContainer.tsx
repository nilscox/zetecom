import React from 'react';

import axios from 'axios';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router';

import UserMenu from 'src/components/domain/UserMenu/UserMenu';
import { useNotificationsCount } from 'src/contexts/notificationsContext';
import { useSetUser, useUser } from 'src/contexts/userContext';

const UserMenuContainer: React.FC = () => {
  const user = useUser();
  const setUser = useSetUser();
  const notificationsCount = useNotificationsCount();
  const history = useHistory();

  const { mutate: logout, isLoading: loading } = useMutation(() => axios.post('/api/auth/logout'), {
    onSuccess: () => {
      history.push('/connexion');
      setUser(null);
    },
  });

  return <UserMenu loading={loading} user={user} notificationsCount={notificationsCount} onLogout={logout} />;
};

export default UserMenuContainer;
