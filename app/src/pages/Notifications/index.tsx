import React from 'react';

import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import AsyncContent from 'src/components/AsyncContent';
import Authenticated from 'src/components/Authenticated';
import FiltersBar from 'src/components/FiltersBar';
import { NotificationProps } from 'src/pages/Notifications/NotificationComponent';
import { Notification, NotificationType } from 'src/types/Notification';

import useNotifications from './hooks/useNotifications';
import CommentsAreaRequestApprovedNotification from './notifications/CommentsAreaRequestApprovedNotification';
import CommentsAreaRequestRejectedNotification from './notifications/CommentsAreaRequestRejectedNotification';
import RulesUpdateNotification from './notifications/RulesUpdateNotification';
import SubscriptionReplyNotification from './notifications/SubscriptionReplyNotification';

const NotificationComponents: Record<NotificationType, React.FC<NotificationProps<NotificationType>>> = {
  rulesUpdate: RulesUpdateNotification,
  subscriptionReply: SubscriptionReplyNotification,
  commentsAreaRequestApproved: CommentsAreaRequestApprovedNotification,
  commentsAreaRequestRejected: CommentsAreaRequestRejectedNotification,
};

const useStyles = makeStyles(({ spacing, palette }) => ({
  title: {
    margin: spacing(4, 0),
    fontSize: 24,
  },
  filters: {
    margin: spacing(4, 0, 8),
  },
  divider: {
    margin: spacing(4, 0),
    borderBottom: `1px solid ${palette.border.main}`,
  },
}));

const NotificationsList: React.FC = () => {
  const { notifications, loading, total, setSearch, page, setPage, markAsSeen } = useNotifications();
  const classes = useStyles();

  const renderNotification = (notification: Notification<NotificationType>, idx: number) => {
    const Component = NotificationComponents[notification.type];

    return (
      <React.Fragment key={notification.id}>
        {idx > 0 && <div className={classes.divider} />}
        <Component notification={notification} markAsSeen={() => markAsSeen(notification)} />
      </React.Fragment>
    );
  };

  return (
    <>
      <Typography variant="h2" className={classes.title}>
        Notifications
      </Typography>
      <FiltersBar
        className={classes.filters}
        pageSize={10}
        page={page}
        total={total}
        onPageChange={setPage}
        onSearch={setSearch}
      />
      <AsyncContent
        loading={loading}
        render={() => (
          <>
            <div>{notifications?.map(renderNotification)}</div>
          </>
        )}
      />
    </>
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
