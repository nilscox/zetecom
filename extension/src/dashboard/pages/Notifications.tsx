import React from 'react';

import { makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import RouterLink from 'src/components/common/Link';
import { Notification, parseNotification } from 'src/types/Notifications';
import useAxiosPaginated from 'src/hooks/use-axios-paginated';

import Authenticated from '../components/Authenticated';

const useStyles = makeStyles((theme: Theme) => ({
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
  const [{ data: notifications, error, loading }] = useAxiosPaginated('/api/notfication/me', parseNotification);

  const classes = useStyles({});

  return (
    <Authenticated>

      <Typography variant="h4">Notifications</Typography>

      <Paper className={classes.paper}>
        <List dense>
          { notifications.map((notification) => (
            <NotificationItem key={notification.id} notification={notification} />
          )) }
        </List>
      </Paper>

    </Authenticated>
  );
};

export default Notifications;
