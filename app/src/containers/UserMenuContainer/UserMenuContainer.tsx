import React from 'react';

import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import { useHistory } from 'react-router';

import UserMenu from 'src/components/domain/UserMenu/UserMenu';
import { useTrackEvent } from 'src/contexts/trackingContext';
import { useSetUser, useUser } from 'src/contexts/userContext';
import track from 'src/domain/track';

const fetchNotificationsCount = async () => {
  const response = await axios.get<{ count: number }>('/api/notification/me/count');

  return response.data.count;
};

const UserMenuContainer: React.FC = () => {
  const user = useUser();
  const setUser = useSetUser();
  const history = useHistory();
  const trackEvent = useTrackEvent();

  const { data: notificationsCount } = useQuery('notificationsCount', fetchNotificationsCount, {
    enabled: Boolean(user),
  });

  const { mutate: logout, isLoading: loading } = useMutation(() => axios.post('/api/auth/logout'), {
    onSuccess: () => {
      history.push('/connexion');
      setUser(null);
      trackEvent(track.logout('App'));
    },
  });

  return <UserMenu loading={loading} user={user} notificationsCount={notificationsCount} onLogout={logout} />;
};

export default UserMenuContainer;
