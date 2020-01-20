import React from 'react';

import { makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';

import RouterLink from 'src/components/common/Link';
import Loader from 'src/components/common/Loader';

import useAxiosPaginated from 'src/hooks/use-axios-paginated';
import { Notification, parseNotification } from 'src/types/Notifications';

type NotificationItemProps = {
  notification: Notification;
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

const NotificationItem: React.FC<NotificationItemProps> = ({ notification }) => {
  const classes = useStyles({});

  return (
    <ListItem className={classes.item}>
      <ListItemText>
        <RouterLink to={`/information/${notification.subscription.reaction.information.id}`}>
          <strong>{notification.actor.nick}</strong>{' '}
          a répondu à une réaction sur l'information{' '}
          <strong>{notification.subscription.reaction.information.title}</strong>
        </RouterLink>
      </ListItemText>
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
  const [{ data: notifications, loading }] = useAxiosPaginated(
    `/api/notification/me${seen ? '/seen' : ''}`,
    parseNotification,
  );
  const classes = useStyles({});

  if (loading)
    return <Loader />;

  if (notifications.length === 0)
    return <FallbackMessage seen={seen} />;

  return (
    <Paper className={classes.paper}>
      <List dense>
        { notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        )) }
      </List>
    </Paper>
  );
};

export default NotificationsList;
