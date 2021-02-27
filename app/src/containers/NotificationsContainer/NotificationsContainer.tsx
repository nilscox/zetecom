import React, { useState } from 'react';

import { useDebounce } from 'use-debounce/lib';

import FiltersBar from 'src/components/domain/FiltersBar/FiltersBar';
import Box from 'src/components/elements/Box/Box';
import AsyncContent from 'src/components/layout/AsyncContent/AsyncContent';
import Fallback from 'src/components/layout/Fallback/Fallback';
import useMarkNotificationAsSeen from 'src/containers/NotificationsContainer/hooks/useMarkNotificationAsSeen';
import useNotifications from 'src/containers/NotificationsContainer/hooks/useNotifications';
import NotificationsList from 'src/containers/NotificationsContainer/NotificationsList/NotificationsList';

type NoNotificationsFallbackProps = {
  isSearching: boolean;
};

const NoNotificationsFallback: React.FC<NoNotificationsFallbackProps> = ({ isSearching }) => {
  if (isSearching) {
    return <>Aucun résultat ne correspond à cette recherche.</>;
  }

  return <>Vous n'avez pas encore reçu de notification.</>;
};

const NotificationsContainer: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [searchDebounced] = useDebounce(search, 200);

  const { notifications, totalNotifications, loadingNotifications } = useNotifications(page, searchDebounced);

  const { markAsSeen } = useMarkNotificationAsSeen();

  return (
    <>
      <Box my={4}>
        <FiltersBar
          page={page}
          total={totalNotifications}
          onPageChange={setPage}
          search={search}
          onSearch={setSearch}
        />
      </Box>

      <AsyncContent
        loading={loadingNotifications}
        render={() => (
          <Fallback
            when={totalNotifications === 0}
            fallback={<NoNotificationsFallback isSearching={search !== ''} />}
            render={() => <NotificationsList notifications={notifications ?? []} markAsSeen={markAsSeen} />}
          />
        )}
      />
    </>
  );
};

export default NotificationsContainer;
