import React from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';

import { UserProvider, useUserContext } from 'src/utils/UserContext';
import Loader from 'src/components/common/Loader';

import UrlIntegration from './UrlIntegration';
import Youtube from './Youtube';

import ReactionHistoryPopup from './popups/ReactionHistoryPopup';
import ReportPopup from './popups/ReportPopup';

const Integrations: React.FC<RouteComponentProps> = () => {
  const [user, setUser] = useUserContext();

  if (user === undefined)
    return <Loader size="big" />;

  return (
    <UserProvider value={{ user, setUser }}>
      <Switch>
        <Route path="/integration" exact component={UrlIntegration} />
        <Route path="/integration/youtube" exact component={Youtube} />
        <Route path="/integration/reaction/:id/history" exact component={ReactionHistoryPopup} />
        <Route path="/integration/reaction/:id/report" exact component={ReportPopup} />
      </Switch>
    </UserProvider>
  );
};

export default Integrations;
