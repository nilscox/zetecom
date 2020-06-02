import React, { useContext, useEffect } from 'react';

import { RouteComponentProps, useLocation } from 'react-router-dom';

import { Link } from 'src/components/Link';
import Loader from 'src/dashboard/components/Loader';
import NotificationsCountContext from 'src/dashboard/contexts/NotificationsCountContext';
import useAxios from 'src/hooks/use-axios';
import { Information, parseInformation } from 'src/types/Information';
import { InformationProvider } from 'src/utils/InformationContext';

import Padding from '../../components/Padding';
import ReactionsZone from '../integration/ReactionsZone';

import { Grid, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useInformation = (id: number) => {
  return useAxios<Information>(`/api/information/${id}`, parseInformation);
};

const useStyles = makeStyles(({ breakpoints, spacing, palette }: Theme) => ({
  title: {
    flex: 1,
    paddingLeft: spacing(4),
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: palette.secondary.dark,
    [breakpoints.down('lg')]: {
      fontSize: '1.5rem',
    },
    [breakpoints.down('md')]: {
      paddingLeft: spacing(2),
      fontSize: '1.5rem',
    },
    [breakpoints.down('sm')]: {
      fontSize: '1.2rem',
    },
  },
  image: {
    width: 240,
    height: 160,
    objectFit: 'cover',
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

const InformationPage: React.FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
  const location = useLocation<{ notificationId?: string }>();
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

      <Padding bottom>
        <Grid container>
          <img className={classes.image} src={information.imageUrl || ''} />
          <Typography variant="h3" className={classes.title}>
            <Link openInNewTab href={information.url}>{ information.title }</Link>
          </Typography>
        </Grid>
      </Padding>

      <ReactionsZone />

    </InformationProvider>
  );
};

export default InformationPage;
