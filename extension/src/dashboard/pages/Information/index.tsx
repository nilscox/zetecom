import React from 'react';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { RouteComponentProps, Redirect, Switch as RouterSwitch, Route } from 'react-router-dom';

import { Information, parseInformation } from 'src/types/Information';
import useAxios from 'src/hooks/use-axios';
import Box from 'src/components/common/Box';
import Flex from 'src/components/common/Flex';

import ReactionsTab from './ReactionTab';
import SubjectsTab from './SubjectsTab';
import Loader from 'src/dashboard/components/Loader';

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

const InformationPage: React.FC<RouteComponentProps<{ id: string }>> = ({ match, history, location }) => {
  const informationId = Number(match.params.id);

  const [{ loading, data: information }] = useInformation(informationId);
  const classes = useStyles({});

  const matchCurrentTab = location.pathname.match(/^\/information\/\d+\/([^\/]*)/);
  const currentTab = matchCurrentTab && matchCurrentTab[1];

  if (loading || !information)
    return <Loader />;

  return (
    <>

      <Flex flexDirection="row">
        <img className={classes.image} src={information.image || ''} />
        <Box m={12} className={classes.title}>{ information.title }</Box>
      </Flex>

      <Box my={12} style={{ borderBottom: '1px solid #CCC' }}>
        <Tabs value={currentTab || 'reactions'} onChange={(_, value) => history.push(`/information/${informationId}/${value}`)}>
          <Tab value="reactions" label="Réactions" />
          <Tab value="thematiques" label="Thématiques" />
        </Tabs>
      </Box>

      <Switch informationId={informationId} />

    </>
  );
};

export default InformationPage;
