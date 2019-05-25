import React from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';

import Youtube from './Youtube';

const Integrations: React.FC<RouteComponentProps> = () => (
  <Switch>
    <Route path="/integration/youtube" exact component={Youtube} />
  </Switch>
);

export default Integrations;
