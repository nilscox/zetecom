import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

import { useTrackEvent } from 'src/contexts/trackingContext';
import track from 'src/domain/track';
import { Notification } from 'src/types/Notification';
import { Paginated } from 'src/types/Paginated';
import replace from 'src/utils/replace';

const markNotificationAsSeen = async (notification: Notification) => {
  await axios.post(`/api/notification/${notification.id}/seen`);
};

const useMarkNotificationAsSeen = () => {
  const queryClient = useQueryClient();
  const trackEvent = useTrackEvent();

  const { mutate: markAsSeen } = useMutation(markNotificationAsSeen, {
    onMutate: notification => {
      const queryCache = queryClient.getQueryCache();
      const queries = queryCache.findAll(['notifications'], { exact: false });

      queryClient.setQueryData<number>('notificationsCount', old => (old ?? 1) - 1);

      for (const query of queries) {
        queryClient.setQueryData<Paginated<Notification>>(query.queryKey, old => {
          if (!old) {
            throw new Error('useMarkNotificationAsSeen.onMutate: old is not set');
          }

          return {
            total: old.total,
            items: replace(
              old.items,
              ({ id }) => id === notification.id,
              old => ({ ...old, seen: new Date() }),
            ),
          };
        });
      }
    },
    onSuccess: (_, { type }) => {
      trackEvent(track.notificationSeen(type));
    },
  });

  return { markAsSeen };
};

export default useMarkNotificationAsSeen;
