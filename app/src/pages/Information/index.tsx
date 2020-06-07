import React, { useEffect } from 'react';

import { RouteComponentProps, useLocation } from 'react-router-dom';

import { InformationProvider } from 'src/contexts/InformationContext';
import { useNotifications } from 'src/contexts/NotificationsContext';
import useAxios from 'src/hooks/use-axios';
import { Information, parseInformation } from 'src/types/Information';

import AsyncContent from '../../components/AsyncContent';
import InformationOverview from '../../components/InformationOverview';
import { Link } from '../../components/Link';
import Padding from '../../components/Padding';
import ReactionsZone from '../integration/ReactionsZone';

const useFetchInformation = (id: number) => {
  return useAxios<Information>(`/api/information/${id}`, parseInformation);
};

const useNotification = () => {
  const { refetch } = useNotifications();

  const [{ status }, setSeen] = useAxios({
    method: 'POST',
  }, undefined, { manual: true });

  useEffect(() => {
    if (status && status(204))
      refetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return {
    markNotificationAsSeen: (id: number) => setSeen({ url: `/api/notification/${id}/seen` }),
  };
};

const InformationPage: React.FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
  const location = useLocation<{ notificationId?: string }>();
  const informationId = Number(match.params.id);
  const { markNotificationAsSeen } = useNotification();

  const [{ loading, data: information, error }] = useFetchInformation(informationId);

  if (error)
    throw error;

  useEffect(() => {
    if (location.state?.notificationId)
      markNotificationAsSeen(parseInt(location.state.notificationId));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state?.notificationId]);

  return (
    <AsyncContent
      loading={loading}
      content={() => (
        <InformationProvider value={information}>
          <Padding bottom>
            <InformationOverview
              information={information}
              title={<Link openInNewTab href={information.url}>{ information.title }</Link>}
            />
          </Padding>

          <ReactionsZone />
        </InformationProvider>
      )}
    />
  );
};

export default InformationPage;
