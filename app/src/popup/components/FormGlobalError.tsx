import React from 'react';

import { FormHelperText, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  globalError: {
    marginTop: theme.spacing(2),
    textAlign: 'center',
  },
}));

type FormGlobalErrorProps = {
  error?: React.ReactNode;
};

const FormGlobalError: React.FC<FormGlobalErrorProps> = ({ error }) => {
  const classes = useStyles();

  if (!error)
    return null;

  return (
    <FormHelperText error className={classes.globalError}>
      { error }
    </FormHelperText>
  );
};

export default FormGlobalError;
