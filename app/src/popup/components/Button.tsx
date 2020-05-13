import React from 'react';

import clsx from 'clsx';

import { makeStyles } from '@material-ui/core';
import MUIButton, { ButtonProps as MUIButtonProps } from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  button: {
    position: 'relative',
    fontWeight: 'bold',
    fontSize: 18,
    color: theme.palette.text.secondary,
  },
  loading: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

type ButtonProps = MUIButtonProps & {
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({ loading, className, disabled, children, ...props }) => {
  const classes = useStyles();

  return (
    <MUIButton size="large" className={clsx(classes.button, className)} disabled={loading || disabled} {...props}>
      { children }
      { loading && <CircularProgress color="secondary" size={24} className={classes.loading} /> }
    </MUIButton>
  );
};

export default Button;
