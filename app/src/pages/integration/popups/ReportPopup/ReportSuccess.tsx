import React from 'react';

import { Grid, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    position: 'absolute',
    height: '100%',
    boxSizing: 'border-box',
  },
});

const ReportSuccess: React.FC = () => {
  const classes = useStyles();

  return (
    <Grid container direction="column" justify="center" alignItems="center" className={classes.container}>
      <Typography color="secondary">Le commentaire a été signalé, merci pour votre contribution ! 💪</Typography>
    </Grid>
  );
};

export default ReportSuccess;
