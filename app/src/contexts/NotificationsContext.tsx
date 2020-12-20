import React, { createContext, useCallback, useContext, useEffect } from 'react';

import { useTrackEvent } from 'src/contexts/TrackingContext';
import useAxios from 'src/hooks/use-axios';
import { Notification, NotificationsCount, NotificationType } from 'src/types/Notification';
import track from 'src/utils/track';

import useLongPolling from '../hooks/useLongPolling';

import { useUser } from './UserContext';

// every minute
const POLL_INTERVAL = 2 * 60_000;

export type NotificationsContextType = {
  count: number;
  fetchCount: () => void;
  markAsSeen: (notification: Notification<NotificationType>) => void;
};

export const NotificationsContext = createContext<NotificationsContextType>({
  count: NaN,
  fetchCount: () => {},
  markAsSeen: () => {},
});

export const useNotifications = () => useContext(NotificationsContext);

const useFetchNotificationsCount = (onUnauthenticated: () => void) => {
  const [result, refetch] = useAxios(
    {
      url: '/api/notification/me/count',
      validateStatus: s => [200, 403].includes(s),
    },
    { manual: true },
    NotificationsCount,
  );

  const { status } = result;

  useEffect(() => {
    if (status(403)) {
      onUnauthenticated();
    }
  }, [status, onUnauthenticated]);

  return [result, refetch] as const;
};

const useMarkNotificationAsSeen = (fetchCount: () => void) => {
  const trackEvent = useTrackEvent();
  const [{ status: setSeenStatus }, setSeen] = useAxios({ method: 'POST' }, { manual: true });

  useEffect(() => {
    if (setSeenStatus(204)) {
      fetchCount();
    }
  }, [setSeenStatus, fetchCount, trackEvent]);

  const markAsSeen = useCallback(
    (notification: Notification<NotificationType>) => {
      setSeen({ url: `/api/notification/${notification.id}/seen` });
      trackEvent(track.notificationSeen(notification.type));
    },
    [setSeen, trackEvent],
  );

  return markAsSeen;
};

export const NotificationsProvider: React.FC = ({ children }) => {
  const [user, setUser] = useUser();
  const onUnauthenticated = useCallback(() => setUser(null), [setUser]);
  const [{ data }, fetchCount] = useFetchNotificationsCount(onUnauthenticated);
  const markAsSeen = useMarkNotificationAsSeen(fetchCount);

  useEffect(() => {
    if (user) {
      fetchCount();
    }
  }, [user, fetchCount]);

  useLongPolling(() => {
    if (user) {
      fetchCount().catch(() => {});
    }
  }, POLL_INTERVAL);

  const value = { count: data?.count || NaN, fetchCount, markAsSeen };

  return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>;
};
