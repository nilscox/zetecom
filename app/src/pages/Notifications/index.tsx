import React from 'react';

import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import AsyncContent from 'src/components/AsyncContent';
import Authenticated from 'src/components/Authenticated';
import { Notification, NotificationType } from 'src/types/Notification';

import useNotifications from './hooks/useNotification';
import RulesUpdateNotification from './notifications/RulesUpdateNotification';
import SubscriptionReplyNotification from './notifications/SubscriptionReplyNotification';

const NotificationComponents = {
  rulesUpdate: RulesUpdateNotification,
  subscriptionReply: SubscriptionReplyNotification,
};

const useStyles = makeStyles(({ spacing, palette }) => ({
  title: {
    margin: spacing(4, 0, 8, 0),
    fontSize: 24,
  },
  divider: {
    margin: spacing(4, 0),
    borderBottom: `1px solid ${palette.border.main}`,
  },
}));

const NotificationsList: React.FC = () => {
  const { notifications, loading, markAsSeen } = useNotifications();
  const classes = useStyles();

  const renderNotification = (notification: Notification<NotificationType>, idx: number) => {
    const Component = NotificationComponents[notification.type] as React.FC<any>;

    return (
      <React.Fragment key={notification.id}>
        {idx > 0 && <div className={classes.divider} />}
        <Component notification={notification} markAsSeen={() => markAsSeen(notification)} />
      </React.Fragment>
    );
  };

  return (
    <AsyncContent
      loading={loading}
      render={() => (
        <>
          <Typography variant="h2" className={classes.title}>
            Notifications
          </Typography>
          <div>{notifications?.map(renderNotification)}</div>
        </>
      )}
    />
  );
};

const Notifications: React.FC = () => {
  return (
    <Authenticated>
      <NotificationsList />
    </Authenticated>
  );
};

export default Notifications;
