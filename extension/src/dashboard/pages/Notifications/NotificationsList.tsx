import React, { useEffect } from 'react';

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

type NotificationItemProps = {
  notification: Notification;
  removeFromList?: () => void;
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
  item: {
    borderBottom: '1px solid #ccc',
    '&:last-child': {
      borderBottom: 'none',
    },
  },
}));

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, removeFromList }) => {
  const [{ status }, setSeen] = useAxios({
    method: 'POST',
    url: `/api/notification/${notification.id}/seen`,
  }, undefined, { manual: true });
  const classes = useStyles({});

  useEffect(() => {
    if (status && status(204))
      removeFromList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <ListItem className={classes.item}>

      <ListItemText onClick={() => setSeen()}>
        <RouterLink to={`/information/${notification.subscription.reaction.information.id}`}>
          <strong>{notification.actor.nick}</strong>{' '}
          a répondu à une réaction sur l'information{' '}
          <strong>{notification.subscription.reaction.information.title}</strong>
        </RouterLink>
      </ListItemText>

      { removeFromList && (
        <ListItemSecondaryAction>
          <IconButton edge="end" onClick={() => setSeen()} data-testid="set-seen-icon">
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

type NotificationsListProps = {
  seen: boolean;
};

const NotificationsList: React.FC<NotificationsListProps> = ({ seen = false }) => {
  const [{ data, loading }] = useAxiosPaginated(
    `/api/notification/me${seen ? '/seen' : ''}`,
    parseNotification,
  );
  const [notifications, { remove }] = useEditableDataset(data);
  const classes = useStyles({});

  if (loading || !notifications)
    return <Loader />;

  if (notifications.length === 0)
    return <FallbackMessage seen={seen} />;

  return (
    <Paper className={classes.paper}>
      <List dense>
        { notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            removeFromList={seen ? undefined : () => remove(notification)}
          />
        )) }
      </List>
    </Paper>
  );
};

export default NotificationsList;
