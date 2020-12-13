import React from 'react';

import { Fade, makeStyles } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles(({ spacing, palette }) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    margin: spacing(1, 0),
  },
  input: {
    border: 0,
    padding: spacing(1, 2),
    borderBottom: `1px solid ${palette.border.main}`,
    fontSize: '1rem',
    '&:focus': {
      borderBottomColor: palette.primary.main,
    },
    '&:hover': {
      borderBottomColor: palette.primary.light,
    },
  },
  error: {
    marginTop: spacing(0.5),
    color: palette.error.main,
    fontWeight: 'bold',
    fontSize: 12,
  },
}));

export type InputProps = React.ComponentProps<'input'> & {
  className?: string;
  fullWidth?: boolean;
  error?: React.ReactNode;
};

const Input: React.FC<InputProps> = ({ className, error, ...props }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <input className={clsx(classes.input, className)} {...props} />
      <Fade in={!!error}>
        <div className={classes.error}>{error}&nbsp;</div>
      </Fade>
    </div>
  );
};

export default Input;
