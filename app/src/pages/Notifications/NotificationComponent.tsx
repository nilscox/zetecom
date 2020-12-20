import React, { useState } from 'react';

import { Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import clsx from 'clsx';
import dayjs from 'dayjs';

import { Notification, NotificationType } from '../../types/Notification';

const DATE_FORMAT = '[Le] DD MMMM YYYY [à] HH:mm';

const imageRatio = 1.61803398875;

type StylesProps = {
  hover: boolean;
  seen: boolean;
};

const useStyles = makeStyles<Theme, StylesProps>(({ spacing }) => ({
  container: ({ seen }) => ({
    height: 120,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    opacity: seen ? 0.5 : 1,
  }),
  image: {
    width: 120 * imageRatio,
    height: '100%',
    objectFit: 'cover',
    paddingRight: spacing(4),
  },
  title: {
    fontSize: 20,
    lineHeight: 1.2,
    flex: 1,
    marginRight: spacing(2),
  },
  dateAndActions: {
    maxHeight: 20,
    marginLeft: 'auto',
    overflow: 'hidden',
    position: 'relative',
  },
  date: ({ seen, hover }) => ({
    fontSize: 14,
    position: 'relative',
    top: !seen && hover ? -25 : 0,
    transition: 'top 150ms ease-in-out',
  }),
  markAsSeen: ({ seen, hover }) => ({
    position: 'relative',
    top: !seen && hover ? -25 : 0,
    transition: 'top 150ms ease-in-out',
    textAlign: 'right',
    cursor: 'pointer',
    display: seen ? 'none' : 'block',
  }),
  subTitle: {
    margin: spacing(1, 0),
  },
  text: {
    fontSize: 14,
    flex: 1,
    overflow: 'hidden',
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 32,
      background: 'linear-gradient(to top, #FFFF, #FFF0 32px)',
    },
  },
}));

export type NotificationProps<T extends NotificationType> = {
  notification: Notification<T>;
  markAsSeen: () => void;
};

type NotificationComponentProps = {
  seen: Date | false;
  title: React.ReactNode;
  subTitle: React.ReactNode;
  text?: React.ReactNode;
  imageSrc: string;
  date: Date;
  markAsSeen: () => void;
};

const NotificationComponent: React.FC<NotificationComponentProps> = ({
  seen,
  title,
  subTitle,
  text,
  imageSrc,
  date,
  markAsSeen,
}) => {
  const [hover, setHover] = useState(false);
  const classes = useStyles({ seen: !!seen, hover });

  return (
    <Grid
      container
      direction="row"
      className={clsx('notification', classes.container)}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Grid item>
        <img className={classes.image} src={imageSrc} />
      </Grid>
      <Grid item style={{ flex: 1, display: 'flex', flexDirection: 'column', maxHeight: '100%' }}>
        <Grid item container direction="row">
          <Typography className={classes.title}>{title}</Typography>
          <Grid item className={classes.dateAndActions}>
            <Typography className={classes.date}>{dayjs(date).format(DATE_FORMAT)}</Typography>
            <Typography className={classes.markAsSeen} onClick={markAsSeen}>
              Marquer comme lue
            </Typography>
          </Grid>
        </Grid>
        <Typography className={classes.subTitle}>{subTitle}</Typography>
        {text && <div className={classes.text}>{text}</div>}
      </Grid>
    </Grid>
  );
};

export default NotificationComponent;
