import useAxiosPaginated from '../../../hooks/use-axios-paginated';
import useEditableDataset from '../../../hooks/useEditableDataset';
import { Notification, parseNotification } from '../../../types/Notification';

import useMarkNotificationAsSeen from './useMarkNotificationAsSeen';

const useNotifications = () => {
  const [{ data, loading }] = useAxiosPaginated(
    '/api/notification/me',
    parseNotification,
  );

  const markAsSeen = useMarkNotificationAsSeen();
  const [notifications, { replace }] = useEditableDataset(data);

  return {
    notifications,
    loading,
    markAsSeen: (notification: Notification) => {
      markAsSeen(notification.id);

      const old = notifications.find(({ id }) => id === notification.id);

      replace(old, new Notification({ ...notification, seen: new Date() }));
    },
  };
};

export default useNotifications;
