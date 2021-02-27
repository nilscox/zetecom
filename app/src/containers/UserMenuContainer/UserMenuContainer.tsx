import React from 'react';

import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import { useHistory } from 'react-router';

import UserMenu from 'src/components/domain/UserMenu/UserMenu';
import { useSetUser, useUser } from 'src/contexts/userContext';

const fetchNotificationsCount = async () => {
  const response = await axios.get<{ count: number }>('/api/notification/me/count');

  return response.data.count;
};

const UserMenuContainer: React.FC = () => {
  const user = useUser();
  const setUser = useSetUser();
  const history = useHistory();

  const { data: notificationsCount } = useQuery('notificationsCount', fetchNotificationsCount, {
    enabled: Boolean(user),
  });

  const { mutate: logout, isLoading: loading } = useMutation(() => axios.post('/api/auth/logout'), {
    onSuccess: () => {
      history.push('/connexion');
      setUser(null);
    },
  });

  return <UserMenu loading={loading} user={user} notificationsCount={notificationsCount} onLogout={logout} />;
};

export default UserMenuContainer;
