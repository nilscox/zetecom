import React from 'react';

import { Route, RouteComponentProps, Switch } from 'react-router-dom';

import Integration from './Integration';
import ReactionHistoryPopup from './popups/ReactionHistoryPopup';
import ReportPopup from './popups/ReportPopup';

const Integrations: React.FC<RouteComponentProps> = () => {
  return (
    <Switch>
      <Route path="/integration" exact component={Integration} />
      <Route path="/integration/reaction/:id/history" exact component={ReactionHistoryPopup} />
      <Route path="/integration/reaction/:id/report" exact component={ReportPopup} />
    </Switch>
  );
};

export default Integrations;
