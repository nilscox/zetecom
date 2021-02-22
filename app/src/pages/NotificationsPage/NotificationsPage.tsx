import React from 'react';

import Authenticated from 'src/components/domain/Authenticated/Authenticated';
import NotificationsContainer from 'src/containers/NotificationsContainer/NotificationsContainer';

const NotificationsPage: React.FC = () => (
  <Authenticated>
    <NotificationsContainer />
  </Authenticated>
);

export default NotificationsPage;
