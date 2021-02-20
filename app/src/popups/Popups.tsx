import React from 'react';

import { Route, Switch } from 'react-router-dom';

import ReportPopup from './ReportPopup/ReportPopup';

const Popups: React.FC = () => (
  <Switch>
    <Route path="/commentaire/:id/signaler" exact component={ReportPopup} />
    {/* <Route path="/commentaire/:id/historique" exact component={HistoryPopup} /> */}
  </Switch>
);

export default Popups;
