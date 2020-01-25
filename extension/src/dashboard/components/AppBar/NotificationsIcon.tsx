import React, { useEffect } from 'react';

import { makeStyles, Theme } from '@material-ui/core/styles';

import Badge from '@material-ui/core/Badge';
import NotificationIcon from '@material-ui/icons/Notifications';

import useAxios from 'src/hooks/use-axios';
import { useCurrentUser } from 'src/hooks/use-user';
import { parseNotificationsCount } from 'src/types/Notifications';

const useStyles = makeStyles((theme: Theme) => ({
  colorPrimary: {
    color: '#fff',
    backgroundColor: theme.palette.highlight.main,
    fontWeight: 'bold',
  },
}));

const NotificationsIcon: React.FC = () => {
  const [{ data: count }, getNotificationsCount] = useAxios('/api/notification/me/count', parseNotificationsCount);
  const user = useCurrentUser();

  const classes = useStyles({});

  useEffect(() => {
    if (user)
      getNotificationsCount();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Badge
      badgeContent={count}
      color="primary"
      classes={{ colorPrimary: classes.colorPrimary }}
      showZero={false}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <NotificationIcon />
    </Badge>
  );
};

export default NotificationsIcon;
