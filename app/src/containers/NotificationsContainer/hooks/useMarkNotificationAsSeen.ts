import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

import { useSetNotificationsCount } from 'src/contexts/notificationsContext';
import { Notification } from 'src/types/Notification';
import { Paginated } from 'src/types/Paginated';

const markNotificationAsSeen = async (notification: Notification) => {
  await axios.post(`/api/notification/${notification.id}/seen`);
};

const replace = <T>(items: T[], predicate: (item: T) => boolean, replacer: (item: T) => T) => {
  const idx = items.findIndex(predicate);

  if (idx < 0) {
    return items;
  }

  return [...items.slice(0, idx), replacer(items[idx]), ...items.slice(idx + 1)];
};

const useMarkNotificationAsSeen = () => {
  const queryClient = useQueryClient();
  const setNotificationsCount = useSetNotificationsCount();

  const { mutate: markAsSeen } = useMutation(markNotificationAsSeen, {
    onMutate: notification => {
      const queryCache = queryClient.getQueryCache();
      const queries = queryCache.findAll(['notifications'], { exact: false });

      setNotificationsCount?.(count => count - 1);

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
  });

  return { markAsSeen };
};

export default useMarkNotificationAsSeen;
