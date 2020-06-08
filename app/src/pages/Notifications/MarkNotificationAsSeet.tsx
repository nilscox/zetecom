import React, { useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import useMarkNotificationAsSeen from './hooks/useMarkNotificationAsSeen';

type LocationSate = {
  notificationId?: number;
};

const MarkNotificationAsSeen: React.FC = () => {
  const location = useLocation<LocationSate>();
  const markAsSeen = useMarkNotificationAsSeen();

  useEffect(() => {
    if (location.state?.notificationId)
      markAsSeen(location.state.notificationId);
  }, [location.state?.notificationId, markAsSeen]);

  return null;
};

export default MarkNotificationAsSeen;
