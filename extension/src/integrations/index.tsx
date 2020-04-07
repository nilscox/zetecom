import React from 'react';

import { Route, RouteComponentProps, Switch } from 'react-router-dom';

import AsyncContent from 'src/components/common/AsyncContent';
import { UserProvider, useUserContext } from 'src/utils/UserContext';

import ReactionHistoryPopup from './popups/ReactionHistoryPopup';
import ReportPopup from './popups/ReportPopup';
import UrlIntegration from './UrlIntegration';

const Integrations: React.FC<RouteComponentProps> = () => {
  const [user, setUser] = useUserContext();

  return (
    <AsyncContent
      loading={user === undefined}
      content={() => (
        <UserProvider value={{ user, setUser }}>
          <Switch>
            <Route path="/integration" exact component={UrlIntegration} />
            <Route path="/integration/reaction/:id/history" exact component={ReactionHistoryPopup} />
            <Route path="/integration/reaction/:id/report" exact component={ReportPopup} />
          </Switch>
        </UserProvider>
      )}
    />
  );
};

export default Integrations;
