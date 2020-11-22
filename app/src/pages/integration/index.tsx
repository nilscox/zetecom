import React from 'react';

import { Route, Switch } from 'react-router-dom';
import { IFrameOriginProvider } from 'src/contexts/IFrameOriginContext';

import Integration from './Integration';
import CommentHistoryPopup from './popups/CommentHistoryPopup';
import ReportPopup from './popups/ReportPopup';

const IntegrationRouter: React.FC = () => {
  return (
    <Switch>
      <Route
        path="/integration"
        exact
        render={() => (
          <IFrameOriginProvider>
            <Integration />
          </IFrameOriginProvider>
        )}
      />
      <Route path="/integration/comment/:id/history" exact component={CommentHistoryPopup} />
      <Route path="/integration/comment/:id/report" exact component={ReportPopup} />
    </Switch>
  );
};

export default IntegrationRouter;
