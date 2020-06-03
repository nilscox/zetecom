import React, { useContext, useEffect } from 'react';

import { RouteComponentProps, useLocation } from 'react-router-dom';

import Loader from 'src/components/Loader';
import { useInformation } from 'src/contexts/InformationContext';
import NotificationsCountContext from 'src/dashboard/contexts/NotificationsCountContext';
import useAxios from 'src/hooks/use-axios';
import { Information, parseInformation } from 'src/types/Information';

import InformationOverview from '../../components/InformationOverview';
import Padding from '../../components/Padding';
import ReactionsZone from '../integration/ReactionsZone';

const useFetchInformation = (id: number) => {
  return useAxios<Information>(`/api/information/${id}`, parseInformation);
};

const useNotification = () => {
  const { refetch } = useContext(NotificationsCountContext);

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

  const [information, setInformation] = useInformation();

  const [{ loading, data }] = useFetchInformation(informationId);

  useEffect(() => void setInformation(data), [data, setInformation]);

  useEffect(() => {
    if (location.state?.notificationId)
      markNotificationAsSeen(parseInt(location.state.notificationId));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state?.notificationId]);

  // TODO: use AsyncContent?
  if (loading || !information)
    return <Loader />;

  return (
    <>
      <Padding bottom>
        <InformationOverview link information={information} />
      </Padding>

      <ReactionsZone />
    </>
  );
};

export default InformationPage;
