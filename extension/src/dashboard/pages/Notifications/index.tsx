import React from 'react';

import { makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import RouterLink from 'src/components/common/Link';
import Loader from 'src/components/common/Loader';
import { Notification, parseNotification } from 'src/types/Notifications';
import useAxiosPaginated from 'src/hooks/use-axios-paginated';

import Authenticated from '../../components/Authenticated';

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

type NotificationsListProps = {
  notifications: Notification[];
};

const NotificationsList: React.FC<NotificationsListProps> = ({ notifications }) => {
  const classes = useStyles({});

  if (notifications.length === 0) {
    return (
      <div className={classes.fallbackMessage}>Vous n'avez pas de nouvelles notifications</div>
    );
  }

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

type NotificationItemProps = {
  notification: Notification;
};

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

const Notifications: React.FC = () => {
  const [{ data: notifications, error, loading }] = useAxiosPaginated('/api/notification/me', parseNotification);

  return (
    <Authenticated>

      <Typography variant="h4">Notifications</Typography>

      { loading
        ? <Loader />
        : (
          <NotificationsList notifications={notifications} />
        )
      }

    </Authenticated>
  );
};

export default Notifications;
