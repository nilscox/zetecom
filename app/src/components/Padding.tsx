import React from 'react';

import clsx from 'clsx';

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  top: {
    paddingTop: spacing(4),
    [breakpoints.down('xs')]: {
      paddingTop: spacing(3),
    },
  },
  bottom: {
    paddingBottom: spacing(4),
    [breakpoints.down('xs')]: {
      paddingBottom: spacing(3),
    },
  },
  y: {
    padding: spacing(4, 0),
    [breakpoints.down('xs')]: {
      padding: spacing(3, 0),
    },
  },
}));

type PaddingProps = {
  top?: boolean;
  bottom?: boolean;
  y?: boolean;
  when?: boolean;
};

const Padding: React.FC<PaddingProps> = ({ top, bottom, y, when = true, children }) => {
  const classes = useStyles();

  if (!when)
    return <>{children}</>;

  return (
    <div className={clsx(top && classes.top, bottom && classes.bottom, y && classes.y)}>
      { children }
    </div>
  );
};

export default Padding;
