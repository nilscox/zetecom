import React from 'react';

import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles(({ spacing, palette }) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    margin: spacing(2, 0),
  },
  input: {
    border: 0,
    padding: spacing(1, 2),
    borderBottom: `1px solid ${palette.border.main}`,
    fontSize: '1rem',
    '&:focus, &.focus': {
      borderBottomColor: palette.primary.main,
    },
    '&:hover': {
      borderBottomColor: palette.primary.light,
    },
  },
  error: {
    marginTop: spacing(1),
    color: palette.error.main,
    fontWeight: 'bold',
    fontSize: 12,
  },
}));

type MergeElementProps<O, T extends React.ElementType> = React.ComponentProps<T> &
  Omit<O, keyof React.ComponentProps<T>>;

export type InputOwnProps = {
  fullWidth?: boolean;
  error?: React.ReactNode;
};

export type InputProps<T extends React.ElementType = 'input'> = MergeElementProps<InputOwnProps, T> & {
  component?: T;
};

const Input = <T extends React.ElementType = 'input'>({ className, error, component, ...props }: InputProps<T>) => {
  const Component = component || 'input';
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Component className={clsx(classes.input, className)} {...props} />
      <div className={classes.error}>{error}</div>
    </div>
  );
};

export default Input;
