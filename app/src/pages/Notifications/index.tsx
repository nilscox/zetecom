import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import DoneIcon from '@material-ui/icons/Done';
import { LocationDescriptorObject } from 'history';
import { useHistory } from 'react-router-dom';

import Authenticated from 'src/components/Authenticated';
import Loader from 'src/components/Loader';
import { Notification } from 'src/types/Notification';

import useNotifications from './hooks/useNotification';

type NotificationProps = { notification: Notification };

const RulesUpdateNotification: React.FC<NotificationProps> = ({ notification }) => (
  <>
    La charte a été mise à jour ! Nouvelle version : <strong>{ notification.payload.version }</strong>
  </>
);

const SubscriptionReplyNotification: React.FC<NotificationProps> = ({ notification: { payload, created } }) => (
  <>
    <div>
      <strong>{ payload.author.nick }</strong> a répondu à un commentaire
    </div>
  </>
);

type NotificationItemProps = {
  divider: boolean;
  notification: Notification;
  markAsSeen: () => void;
};

const NotificationItem: React.FC<NotificationItemProps> = ({ divider, notification, markAsSeen }) => {
  const history = useHistory();

  const NotificationElement = {
    rulesUpdate: RulesUpdateNotification,
    subscriptionReply: SubscriptionReplyNotification,
  }[notification.type];

  const handleClick = () => {
    const { href, external } = notification.getLink();

    if (external)
      window.open(href);
    else {
      const location: LocationDescriptorObject<{ notificationId?: number }> = { pathname: href, state: {} };

      if (!notification.seen)
        location.state.notificationId = notification.id;

      history.push(location);
    }
  };

  return (
    <ListItem divider={divider} button onClick={handleClick}>

      <ListItemText style={{ opacity: notification.seen ? 0.5 : 1 }}>
        <NotificationElement notification={notification} />
      </ListItemText>

      { !notification.seen && (
        <ListItemSecondaryAction>
          <IconButton edge="end" onClick={markAsSeen} data-testid="set-seen-icon">
            <DoneIcon />
          </IconButton>
        </ListItemSecondaryAction>
      ) }

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

  if (loading || !notifications)
    return <Loader />;

  return (
    <Paper elevation={3} className={classes.notificationsList}>
      <List disablePadding>
        { notifications.map((notification, n)=> (
          <NotificationItem
            key={notification.id}
            divider={n < notifications.length - 1}
            notification={notification}
            markAsSeen={() => markAsSeen(notification)}
          />
        )) }
      </List>
    </Paper>
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
