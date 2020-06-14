import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Integration from './Integration';
import ReactionHistoryPopup from './popups/ReactionHistoryPopup';
import ReportPopup from './popups/ReportPopup';

const IntegrationRouter: React.FC = () => {
  return (
    <Switch>
      <Route path="/integration" exact component={Integration} />
      <Route path="/integration/reaction/:id/history" exact component={ReactionHistoryPopup} />
      <Route path="/integration/reaction/:id/report" exact component={ReportPopup} />
    </Switch>
  );
};

export default IntegrationRouter;
