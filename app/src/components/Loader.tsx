/* eslint-disable max-len */

import React from 'react';

import { CircularProgress, makeStyles } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapSizes: { [key in LoaderProps['size']]: number } = {
  small: 16,
  medium: 32,
  big: 48,
};

type LoaderProps = {
  className?: string;
  size?: 'small' | 'medium' | 'big';
};

const Loader: React.FC<LoaderProps> = ({ className, size = 'medium' }) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.container, className)}>
      <CircularProgress size={mapSizes[size]} />
    </div>
  );
};

export default Loader;
