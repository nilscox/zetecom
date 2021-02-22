import React from 'react';

import FiltersBar from 'src/components/domain/FiltersBar/FiltersBar';
import Box from 'src/components/elements/Box/Box';
import AsyncContent from 'src/components/layout/AsyncContent/AsyncContent';
import Fallback from 'src/components/layout/Fallback/Fallback';
import NotificationsList from 'src/containers/NotificationsContainer/NotificationsList/NotificationsList';
import { useSetNotificationsCount } from 'src/contexts/notificationsContext';
import useAxios from 'src/hooks/useAxios';
import useAxiosPaginated from 'src/hooks/useAxiosPaginated';
import useEditableDataset from 'src/hooks/useEditableDataset';
import { Notification as NotificationType } from 'src/types/Notification';

const NotificationsContainer: React.FC = () => {
  const setNotificationsConut = useSetNotificationsCount();

  const [notifications, { loading, page, setPage, search, setSearch }] = useAxiosPaginated<NotificationType>(
    '/api/notification/me',
  );

  const [notificationsDataset, { replace }] = useEditableDataset(notifications?.items, 'set');

  const [, , executeMarkAsSeen] = useAxios({ method: 'POST' });

  const markAsSeen = (notification: NotificationType) => {
    replace(notification, { ...notification, seen: new Date() });
    executeMarkAsSeen({ url: `/api/notification/${notification?.id}/seen` });
    setNotificationsConut?.(count => count - 1);
  };

  const fallback = search ? (
    <>Aucun résultat ne correspond à cette recherche.</>
  ) : (
    <>Vous n'avez pas encore reçu de notification.</>
  );

  return (
    <>
      <Box my={4}>
        <FiltersBar
          page={page}
          total={notifications?.total}
          onPageChange={setPage}
          search={search}
          onSearch={setSearch}
        />
      </Box>
      <AsyncContent
        loading={loading}
        render={() => (
          <Fallback
            when={notifications?.total === 0}
            fallback={fallback}
            render={() => <NotificationsList notifications={notificationsDataset ?? []} markAsSeen={markAsSeen} />}
          />
        )}
      />
    </>
  );
};

export default NotificationsContainer;
