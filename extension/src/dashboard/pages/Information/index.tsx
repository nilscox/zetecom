import React, { useContext, useEffect } from 'react';

import { makeStyles, Theme } from '@material-ui/core/styles';
import { RouteComponentProps, Redirect, Switch as RouterSwitch, Route } from 'react-router-dom';

import { Information, parseInformation } from 'src/types/Information';
import Loader from 'src/dashboard/components/Loader';
import Box from 'src/components/common/Box';
import Flex from 'src/components/common/Flex';
import { Link } from 'src/components/common/Link';
import useAxios from 'src/hooks/use-axios';

import ReactionsTab from './ReactionTab';
import { InformationProvider } from 'src/utils/InformationContext';
import NotificationsCountContext from 'src/dashboard/contexts/NotificationsCountContext';

const useInformation = (id: number) => {
  return useAxios<Information>(`/api/information/${id}`, parseInformation);
};

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: theme.palette.secondary.dark,
  },
  image: {
    width: 240,
    height: 160,
  },
}));

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

const InformationPage: React.FC<RouteComponentProps<{ id: string }>> = ({ match, history, location }) => {
  const informationId = Number(match.params.id);
  const { markNotificationAsSeen } = useNotification();

  const [{ loading, data: information }] = useInformation(informationId);
  const classes = useStyles({});

  useEffect(() => {
    if (location.state?.notificationId)
      markNotificationAsSeen(parseInt(location.state.notificationId));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state?.notificationId]);

  if (loading || !information)
    return <Loader />;

  return (
    <InformationProvider value={information}>

      <Flex flexDirection="row">
        <img className={classes.image} src={information.image || ''} />
        <Box m={12} className={classes.title}>
          <Link openInNewTab href={information.url}>{ information.title }</Link>
        </Box>
      </Flex>

      <ReactionsTab informationId={informationId} />

    </InformationProvider>
  );
};

export default InformationPage;
