import React from 'react';

import { Grid, makeStyles } from '@material-ui/core';

import Button from 'src/components/Button';

const useStyles = makeStyles(({ spacing, palette }) => ({
  container: {
    borderTop: `1px solid ${palette.border.main}`,
    background: 'rgba(0, 0, 0, 0.03)',
  },
  sendButton: {
    color: palette.text.secondary,
    padding: spacing(2),
  },
}));

type FormFooterProps = {
  disabled: boolean;
};

const FormFooter: React.FC<FormFooterProps> = ({ disabled }) => {
  const classes = useStyles();

  return (
    <Grid container justify="flex-end" className={classes.container}>
      <Button type="submit" disabled={disabled} className={classes.sendButton}>
        Envoyer
      </Button>
    </Grid>
  );
};

export default FormFooter;
