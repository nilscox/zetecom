import { useCallback, useEffect } from 'react';

import { useNotifications } from '../../../contexts/NotificationsContext';
import useAxios from '../../../hooks/use-axios';

const useMarkNotificationAsSeen = () => {
  const { refetch: refetchNotificationsCount } = useNotifications();

  const [{ status: setSeenStatus }, setSeen] = useAxios({
    method: 'POST',
  }, undefined, { manual: true });

  useEffect(() => {
    if (setSeenStatus(204))
      refetchNotificationsCount();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setSeenStatus]);

  const markAsSeen = useCallback((notificationId: number) => {
    setSeen({ url: `/api/notification/${notificationId}/seen` });
  }, [setSeen]);

  return markAsSeen;
};

export default useMarkNotificationAsSeen;
