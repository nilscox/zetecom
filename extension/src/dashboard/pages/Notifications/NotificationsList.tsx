import React, { useEffect, useState, useContext } from 'react';

import { makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import DoneIcon from '@material-ui/icons/Done';

import RouterLink from 'src/components/common/Link';
import Loader from 'src/components/common/Loader';

import useAxiosPaginated from 'src/hooks/use-axios-paginated';
import { Notification, parseNotification } from 'src/types/Notifications';
import useAxios from 'src/hooks/use-axios';
import useEditableDataset from 'src/hooks/use-editable-dataset';
import NotificationsCountContext from 'src/dashboard/contexts/NotificationsCountContext';
import { Divider } from '@material-ui/core';

type NotificationItemProps = {
  notification: Notification;
  seen: boolean;
  markAsSeen: () => void;
};

const useStyles = makeStyles((theme: Theme) => ({
  fallbackMessage: {
    marginTop: theme.spacing(2),
    fontWeight: 'bold',
    color: theme.palette.secondary.light,
    fontSize: '1.4em',
  },
  paper: {
    marginTop: theme.spacing(2),
  },
}));

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, seen, markAsSeen }) => {
  const { information } = notification.subscription.reaction;
  const query = !seen && `?notificationId=${notification.id}`;

  return (
    <ListItem>

      <ListItemText>
        <RouterLink to={`/information/${information.id}/reactions${query || ''}`}>
          <strong>{ notification.actor.nick }</strong>{' '}
          a répondu à une réaction sur l'information{' '}
          <strong>{ information.title }</strong>
        </RouterLink>
      </ListItemText>

      { !seen && (
        <ListItemSecondaryAction>
          <IconButton edge="end" onClick={() => markAsSeen()} data-testid="set-seen-icon">
            <DoneIcon />
          </IconButton>
        </ListItemSecondaryAction>
      ) }

    </ListItem>
  );
};

type FallbackMessageProps = {
  seen: boolean;
};

const FallbackMessage: React.FC<FallbackMessageProps> = ({ seen }) => {
  const classes = useStyles({});

  const getMessageText = () => {
    if (seen)
      return <>Aucunes notifications</>;

    return <>Aucunes nouvelles notifications</>;
  };

  return <div className={classes.fallbackMessage}>{ getMessageText() }</div>;
};

const useNotifications = (seen: boolean) => {
  const { refetch } = useContext(NotificationsCountContext);

  const [{ data, loading }] = useAxiosPaginated(
    `/api/notification/me${seen ? '/seen' : ''}`,
    parseNotification,
  );
  const [{ status }, setSeen] = useAxios({
    method: 'POST',
  }, undefined, { manual: true });

  const [notifications, { remove }] = useEditableDataset(data);
  const [notification, setNotification] = useState<Notification | null>(null);

  const markAsSeen = (notification: Notification) => {
    if (seen)
      return;

    setNotification(notification);
    setSeen({ url: `/api/notification/${notification.id}/seen` });
  };

  useEffect(() => {
    if (status && status(204)) {
      remove(notification);
      setNotification(null);
      refetch();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return {
    notifications,
    loading,
    markAsSeen,
  };
};

type NotificationsListProps = {
  seen: boolean;
};

const NotificationsList: React.FC<NotificationsListProps> = ({ seen = false }) => {
  const { notifications, loading, markAsSeen } = useNotifications(seen);
  const classes = useStyles({});

  if (loading || !notifications)
    return <Loader />;

  if (notifications.length === 0)
    return <FallbackMessage seen={seen} />;

  return (
    <Paper className={classes.paper}>
      <List dense>
        { notifications.map((notification, idx) => (
          <div key={notification.id}>
            <NotificationItem
              notification={notification}
              seen={seen}
              markAsSeen={() => markAsSeen(notification)}
            />
            { idx < notifications.length - 1 && <Divider /> }
          </div>
        )) }
      </List>
    </Paper>
  );
};

export default NotificationsList;
