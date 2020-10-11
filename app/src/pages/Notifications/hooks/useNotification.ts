import { classToClass } from 'class-transformer';

import useAxiosPaginated from '../../../hooks/use-axios-paginated';
import useEditableDataset from '../../../hooks/useEditableDataset';
import { Notification, NotificationType } from '../../../types/Notification';

import useMarkNotificationAsSeen from './useMarkNotificationAsSeen';

const useNotifications = () => {
  const [{ data, loading }] = useAxiosPaginated<Notification<NotificationType>>(
    '/api/notification/me',
    undefined,
    Notification,
  );

  const markAsSeen = useMarkNotificationAsSeen();
  const [notifications, { replace }] = useEditableDataset(data, 'set');

  return {
    notifications,
    loading,
    markAsSeen: (notification: Notification<NotificationType>) => {
      markAsSeen(notification.id);

      const seen = classToClass(notification);

      seen.seen = new Date();

      replace(notification, seen);
    },
  };
};

export default useNotifications;
