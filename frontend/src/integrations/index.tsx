import React from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';

import Youtube from './Youtube';
import ReportPopup from './popups/ReportPopup';

const Integrations: React.FC<RouteComponentProps> = () => (
  <Switch>
    <Route path="/integration/youtube" exact component={Youtube} />
    <Route path="/integration/reaction/:id/report" exact component={ReportPopup} />
  </Switch>
);

export default Integrations;
