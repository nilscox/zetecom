import React, { forwardRef } from 'react';

import { Grid, GridProps, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles(({ palette }) => ({
  text: {
    fontWeight: 600,
    color: palette.text.secondary,
    textAlign: 'center',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '100%',
  },
}));

type UserMenuComponentProps = GridProps & {
  image: React.ReactNode;
  text: string;
};

const UserMenuComponent = forwardRef<HTMLDivElement, UserMenuComponentProps>(({ image, text, ...props }, ref) => {
  const classes = useStyles();

  return (
    <Grid
      ref={ref}
      container
      direction="column"
      alignItems="center"
      style={{ width: 140 }}
      {...props}
      className={clsx('user-menu', props.className)}
    >
      {image}
      <Grid item style={{ maxWidth: '100%' }}>
        <Typography className={classes.text}>{text}</Typography>
      </Grid>
    </Grid>
  );
});

UserMenuComponent.displayName = 'UserMenuComponent';

export default UserMenuComponent;
