import React, { useContext, useEffect } from 'react';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { RouteComponentProps, Redirect, Switch as RouterSwitch, Route } from 'react-router-dom';

import { Information, parseInformation } from 'src/types/Information';
import Loader from 'src/dashboard/components/Loader';
import Box from 'src/components/common/Box';
import Flex from 'src/components/common/Flex';
import { Link } from 'src/components/common/Link';
import useAxios from 'src/hooks/use-axios';
import useQueryString from 'src/hooks/use-query-string';

import ReactionsTab from './ReactionTab';
import SubjectsTab from './SubjectsTab';
import { InformationProvider } from 'src/utils/InformationContext';
import NotificationsCountContext from 'src/dashboard/contexts/NotificationsCountContext';

const Switch: React.FC<{ informationId: number }> = ({ informationId }) => (
  <RouterSwitch>
    <Route path="/information/:id/reactions" component={ReactionsTab} />
    <Route path="/information/:id/thematiques" component={SubjectsTab} />
    <Route render={() => <Redirect to={`/information/${informationId}/reactions`} />} />
  </RouterSwitch>
);

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

  const matchCurrentTab = location.pathname.match(/^\/information\/\d+\/([^/]*)/);
  const currentTab = matchCurrentTab && matchCurrentTab[1];

  useEffect(() => {
    if (location.state && location.state.notificationId)
      markNotificationAsSeen(parseInt(location.state.notificationId));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

      <Box my={12} style={{ borderBottom: '1px solid #CCC' }}>
        <Tabs
          value={currentTab || 'reactions'}
          onChange={(_, value) => history.push(`/information/${informationId}/${value}`)}
        >
          <Tab value="reactions" label="Réactions" />
          <Tab value="thematiques" label="Thématiques" />
        </Tabs>
      </Box>

      <Switch informationId={informationId} />

    </InformationProvider>
  );
};

export default InformationPage;
