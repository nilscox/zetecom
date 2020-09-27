import React from 'react';

import { makeStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import SubscribeIcon from '@material-ui/icons/Notifications';
import SubscribeActiveIcon from '@material-ui/icons/NotificationsActive';

import { useCurrentUser } from 'src/contexts/UserContext';
import { Comment } from 'src/types/Comment';

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  iconSizeSmall: {
    padding: spacing(0, 1),
    '& svg': {
      fontSize: 'inherit',
    },
    [breakpoints.down('xs')]: {
      fontSize: spacing(4),
    },
  },
}));

type SubscribeButtonProps = {
  comment: Comment;
  toggleSubscription: () => void;
};

const SubscribeButton: React.FC<SubscribeButtonProps> = ({ comment, toggleSubscription }) => {
  const user = useCurrentUser();
  const classes = useStyles();

  if (!user || !toggleSubscription) {
    return null;
  }

  return (
    <IconButton
      size="small"
      classes={{ sizeSmall: classes.iconSizeSmall }}
      title={comment.subscribed ? 'Se désabonner' : 'S\'abonner'}
      onClick={toggleSubscription}
    >
      { comment.subscribed
        ? <SubscribeActiveIcon color="secondary" />
        : <SubscribeIcon color="disabled" />
      }
    </IconButton>
  );
};

export default SubscribeButton;
