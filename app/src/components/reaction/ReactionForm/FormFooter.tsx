import React from 'react';

import { Button, Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(({ breakpoints, spacing, palette: { border } }) => ({
  container: {
    borderTop: `1px solid ${border.light}`,
    padding: spacing(2),
    background: 'rgba(0, 0, 0, 0.03)',
    [breakpoints.down('xs')]: {
      padding: spacing(1),
    },
  },
}));

type FormFooterProps = {
  disabled: boolean;
};

const FormFooter: React.FC<FormFooterProps> = ({ disabled }) => {
  const classes = useStyles();

  return (
    <Grid container justify="flex-end" className={classes.container}>
      <Button type="submit" disabled={disabled}>
        Envoyer
      </Button>
    </Grid>
  );
};

export default FormFooter;
