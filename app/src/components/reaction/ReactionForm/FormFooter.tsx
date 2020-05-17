import React from 'react';

import { Button, Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(({ breakpoints, spacing, palette: { border } }) => ({
  reactionFooter: {
    borderTop: `1px solid ${border.light}`,
    padding: spacing(2),
    [breakpoints.down('xs')]: {
      padding: spacing(1),
    },
  },
}));

type FormFooterProps = {
  loading: boolean;
  disabled: boolean;
};

const FormFooter: React.FC<FormFooterProps> = ({ loading, disabled }) => {
  const classes = useStyles();

  return (
    <Grid container justify="flex-end" className={classes.reactionFooter}>
      <Button type="submit" disabled={disabled}>
        Envoyer
      </Button>
    </Grid>
  );
};

export default FormFooter;
