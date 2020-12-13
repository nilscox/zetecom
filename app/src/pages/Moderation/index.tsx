import React from 'react';

import { Tab, Tabs } from '@material-ui/core';
import { Link, Redirect, Route, Switch, useLocation } from 'react-router-dom';

import Authenticated from 'src/components/Authenticated';

import CommentsAreaRequestsModeration from './CommentsAreaRequestsModeration';
import ReportedComments from './ReportedComments';

const Moderation: React.FC = () => {
  const location = useLocation();

  return (
    <Authenticated>
      <Tabs value={location.pathname}>
        <Tab label="Signalements" component={Link} value="/moderation/signalements" to="/moderation/signalements" />
        <Tab label="Ouvertures" component={Link} value="/moderation/ouvertures" to="/moderation/ouvertures" />
        <Tab component={Link} value="/moderation" to="" style={{ display: 'none' }} />
      </Tabs>
      <Switch>
        <Route path="/moderation/signalements" component={ReportedComments} />
        <Route path="/moderation/ouvertures" component={CommentsAreaRequestsModeration} />
        <Route render={() => <Redirect to="/moderation/signalements" />} />
      </Switch>
    </Authenticated>
  );
};

export default Moderation;
