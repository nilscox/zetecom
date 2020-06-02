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
  y: {
    padding: spacing(4, 0),
    [breakpoints.down('xs')]: {
      padding: spacing(3, 0),
    },
  },
}));

type PaddingProps = {
  top?: boolean;
  y?: boolean;
  when?: boolean;
};

const Padding: React.FC<PaddingProps> = ({ top, y, when = true, children }) => {
  const classes = useStyles();

  if (!when)
    return <>{children}</>;

  return (
    <div className={clsx(top && classes.top, y && classes.y)}>
      { children }
    </div>
  );
};

export default Padding;
