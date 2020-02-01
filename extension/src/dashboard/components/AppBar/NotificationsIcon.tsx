import React, { useContext } from 'react';

import { makeStyles, Theme } from '@material-ui/core/styles';

import Badge from '@material-ui/core/Badge';
import NotificationIcon from '@material-ui/icons/Notifications';

import NotificationsCountContext from 'src/dashboard/contexts/NotificationsCountContext';

const useStyles = makeStyles((theme: Theme) => ({
  colorPrimary: {
    color: '#fff',
    backgroundColor: theme.palette.highlight.main,
    fontWeight: 'bold',
  },
}));

const NotificationsIcon: React.FC = () => {
  const { count } = useContext(NotificationsCountContext);

  const classes = useStyles({});

  return (
    <Badge
      badgeContent={count}
      color="primary"
      classes={classes}
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
