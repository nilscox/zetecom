import React, { useEffect } from 'react';

import { fetchUserNotifications, selectIsFetchingNotifications, selectUserNotifications } from '@zetecom/app-core';
import { useDispatch } from 'react-redux';

import { Authenticated } from '~/components/domain/Authenticated/Authenticated';
import { Notification } from '~/components/domain/Notification/Notification';
import { Text } from '~/components/elements/Text/Text';
import { Async } from '~/components/layout/Async/Async';
import { Fallback } from '~/components/layout/Fallback/Fallback';
import { List } from '~/components/layout/List/List';
import { useAppSelector } from '~/hooks/useAppSelector';

export const NotificationsView: React.FC = () => {
  const dispatch = useDispatch();

  const loading = useAppSelector(selectIsFetchingNotifications);
  const notifications = useAppSelector(selectUserNotifications);

  useEffect(() => {
    dispatch(fetchUserNotifications());
  }, []);

  return (
    <Authenticated>
      <Text as="h2" fontSize={5} fontWeight="bold" marginY={5}>
        Notifications
      </Text>
      <Async
        loading={loading}
        render={() => (
          <>
            <List rowGap={4}>
              {notifications?.map((notification) => (
                <Notification key={notification.id} notificationId={notification.id} />
              ))}
            </List>

            {notifications.length === 0 && <Fallback>Vous n'avez pas encore reçu de notifications.</Fallback>}
          </>
        )}
      />
    </Authenticated>
  );
};
