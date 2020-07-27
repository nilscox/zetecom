import React, { useEffect, useState } from 'react';

import { AxiosRequestConfig } from 'axios';

import { useCurrentUser } from 'src/contexts/UserContext';
import useAxios from 'src/hooks/use-axios';
import { Comment } from 'src/types/Comment';
import { trackSubscribeComment } from 'src/utils/track';

import { makeStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import SubscribeIcon from '@material-ui/icons/Notifications';
import SubscribeActiveIcon from '@material-ui/icons/NotificationsActive';

const useSubscription = (comment: Comment) => {
  const [subscribed, setSubscribed] = useState(comment.subscribed);

  const opts: AxiosRequestConfig = {
    method: 'POST',
  };

  const [{ loading, error, status }, execute] = useAxios(opts, undefined, { manual: true });

  if (error)
    throw error;

  const toggleSubscription = () => {
    if (loading)
      return;

    execute({ url: `/api/reaction/${comment.id}/${subscribed ? 'unsubscribe' : 'subscribe' }` });

    // optimist update
    setSubscribed(!subscribed);
  };

  useEffect(() => {
    if (status(201)) {
      trackSubscribeComment();
      setSubscribed(true);
    } else if (status(204))
      setSubscribed(false);
  }, [status]);

  return {
    subscribed,
    toggleSubscription,
  };
};

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
};

const SubscribeButton: React.FC<SubscribeButtonProps> = ({ comment }) => {
  const classes = useStyles();

  const user = useCurrentUser();
  const { subscribed, toggleSubscription } = useSubscription(comment);

  if (!user)
    return null;

  return (
    <IconButton
      size="small"
      classes={{ sizeSmall: classes.iconSizeSmall }}
      title={subscribed ? 'Se désabonner' : 'S\'abonner'}
      onClick={toggleSubscription}
    >
      { subscribed
        ? <SubscribeActiveIcon color="secondary" />
        : <SubscribeIcon color="disabled" />
      }
    </IconButton>
  );
};

export default SubscribeButton;
