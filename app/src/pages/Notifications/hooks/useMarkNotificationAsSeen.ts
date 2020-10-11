import { useCallback, useEffect } from 'react';

import { useNotifications } from '../../../contexts/NotificationsContext';
import useAxios from '../../../hooks/use-axios';

const useMarkNotificationAsSeen = () => {
  const [{ status: setSeenStatus }, setSeen] = useAxios({ method: 'POST' }, { manual: true });
  const { refetch: refetchNotificationsCount } = useNotifications();

  useEffect(() => {
    if (setSeenStatus(204)) {
      refetchNotificationsCount();
    }
    // TODO
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setSeenStatus]);

  // TODO: is this useCallback necessary?
  const markAsSeen = useCallback(
    (notificationId: number) => {
      setSeen({ url: `/api/notification/${notificationId}/seen` });
    },
    [setSeen],
  );

  return markAsSeen;
};

export default useMarkNotificationAsSeen;
