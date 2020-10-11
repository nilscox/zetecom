import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import DoneIcon from '@material-ui/icons/Done';

import AsyncContent from 'src/components/AsyncContent';
import Authenticated from 'src/components/Authenticated';
import { Notification, NotificationType } from 'src/types/Notification';

import useNotifications from './hooks/useNotification';

type NotificationProps<T extends NotificationType> = { notification: Notification<T> };

const RulesUpdateNotification: React.FC<NotificationProps<'rulesUpdate'>> = ({ notification }) => (
  <>
    La charte a été mise à jour ! Nouvelle version : <strong>{notification.payload.version}</strong>
  </>
);

const SubscriptionReplyNotification: React.FC<NotificationProps<'subscriptionReply'>> = ({ notification }) => (
  <>
    <div>
      <strong>{notification.payload.author.nick}</strong> a répondu à un commentaire
    </div>
  </>
);

type NotificationItemProps = {
  divider: boolean;
  notification: Notification<NotificationType>;
  markAsSeen: () => void;
};

const NotificationItem: React.FC<NotificationItemProps> = ({ divider, notification, markAsSeen }) => {
  const NotificationElement: React.FC<NotificationProps<NotificationType>> = {
    rulesUpdate: RulesUpdateNotification,
    subscriptionReply: SubscriptionReplyNotification,
  }[notification.type];

  return (
    <ListItem divider={divider} button>
      <ListItemText style={{ opacity: notification.seen ? 0.5 : 1 }}>
        <NotificationElement notification={notification} />
      </ListItemText>

      {!notification.seen && (
        <ListItemSecondaryAction>
          <IconButton edge="end" onClick={markAsSeen} data-testid="set-seen-icon">
            <DoneIcon />
          </IconButton>
        </ListItemSecondaryAction>
      )}
    </ListItem>
  );
};

const useStyles = makeStyles(({ spacing }) => ({
  notificationsList: {
    marginTop: spacing(8),
  },
}));

const NotificationsList: React.FC = () => {
  const { notifications, loading, markAsSeen } = useNotifications();
  const classes = useStyles();

  return (
    <AsyncContent
      loading={loading}
      render={() => (
        <Paper elevation={3} className={classes.notificationsList}>
          <List disablePadding>
            {notifications?.map((notification, n) => (
              <NotificationItem
                key={notification.id}
                divider={n < notifications.length - 1}
                notification={notification}
                markAsSeen={() => markAsSeen(notification)}
              />
            ))}
          </List>
        </Paper>
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
