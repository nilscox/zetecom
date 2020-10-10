import React from 'react';

import { makeStyles, Theme } from '@material-ui/core';

type StylesProps = {
  loading?: boolean;
  small?: boolean;
};

const useStyles = makeStyles<Theme, StylesProps>(({ breakpoints, palette }) => ({
  container: ({ small }) => ({
    width: small ? 24 : 32,
    height: small ? 24 : 32,
    [breakpoints.down('xs')]: {
      width: small ? 16 : 24,
      height: small ? 16 : 24,
    },
  }),
  avatar: ({ loading }) => ({
    borderRadius: 16,
    border: `1px solid ${palette.secondary.light}`,
    opacity: loading ? 0.7 : 1,
    background: 'white',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  }),
}));

type CircleAvatarImageProps = {
  loading?: boolean;
  small?: boolean;
  src: string;
};

export const CircleAvatarIwage: React.FC<CircleAvatarImageProps> = ({ loading, small, src }) => {
  const classes = useStyles({ loading, small });

  return (
    <div className={classes.container}>
      <img className={classes.avatar} src={src} />
    </div>
  );
};
