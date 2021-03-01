import axios from 'axios';
import { QueryFunction, useQuery } from 'react-query';

import { Notification } from 'src/types/Notification';
import { Paginated } from 'src/types/Paginated';
import makeParams from 'src/utils/makeParams';

const fetchNotifications: QueryFunction<Paginated<Notification>> = async ({ queryKey: [, { page, search }] }) => {
  const response = await axios('/api/notification/me', { params: makeParams({ page, search }) });

  return response.data;
};

const useNotifications = (page: number, search: string) => {
  const { data, isLoading: loadingNotifications } = useQuery(['notifications', { page, search }], fetchNotifications);

  return {
    notifications: data?.items,
    totalNotifications: data?.total,
    loadingNotifications,
  };
};

export default useNotifications;
