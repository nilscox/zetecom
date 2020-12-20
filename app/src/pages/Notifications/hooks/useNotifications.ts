import { useContext } from 'react';

import { classToClass } from 'class-transformer';

import { NotificationsContext } from 'src/contexts/NotificationsContext';
import useAxiosPaginated from 'src/hooks/use-axios-paginated';
import useEditableDataset from 'src/hooks/useEditableDataset';
import { Notification, NotificationType } from 'src/types/Notification';

const useNotifications = () => {
  const [{ data, loading }] = useAxiosPaginated<Notification<NotificationType>>(
    '/api/notification/me',
    undefined,
    Notification,
  );

  const { markAsSeen } = useContext(NotificationsContext);
  const [notifications, { replace }] = useEditableDataset(data, 'set');

  return {
    notifications,
    loading,
    markAsSeen: (notification: Notification<NotificationType>) => {
      markAsSeen(notification);

      replace(
        notification,
        classToClass({
          ...notification,
          seen: new Date(),
        }),
      );
    },
  };
};

export default useNotifications;
