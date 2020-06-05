import React from 'react';

import { makeStyles } from '@material-ui/core';

type StylesProps = {
  loading?: boolean;
  small?: boolean;
};

const useStyles = makeStyles(({ breakpoints, palette }) => ({
  avatar: ({ loading, small }: StylesProps) => ({
    borderRadius: 16,
    border: `1px solid ${palette.secondary.light}`,
    opacity: loading ? 0.7 : 1,
    background: 'white',
    width: small ? 24 : 32,
    height: small ? 24 : 32,
    [breakpoints.down('xs')]: {
      width: small ? 16 : 24,
      height: small ? 16 : 24,
    },
  }),
}));

type CircleAvatarImageProps = {
  loading?: boolean;
  small?: boolean;
  src: string;
};

export const CircleAvatarIwage: React.FC<CircleAvatarImageProps> = ({ loading, small, src }) => {
  const classes = useStyles({ loading, small });

  return <img className={classes.avatar} src={src} />;
};
