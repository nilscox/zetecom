import React from 'react';

import { FormHelperText, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  error: {
    fontSize: 16,
    margin: theme.spacing(4, 0),
  },
}));

type FormErrorProps = {
  error?: React.ReactNode;
  consistentHeight?: boolean;
};

const FormError: React.FC<FormErrorProps> = ({ error, consistentHeight }) => {
  const classes = useStyles();

  if (!error && !consistentHeight)
    return null;

  return (
    <FormHelperText error className={classes.error}>
      { error || <>&nbsp;</> }
    </FormHelperText>
  );
};

export default FormError;
