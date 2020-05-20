import React from 'react';

import { Grid, makeStyles } from '@material-ui/core';

const useIndentedStyles = makeStyles(({ breakpoints, spacing, palette: { border } }) => ({
  bar: {
    borderLeft: `6px solid ${border.main}`,
    paddingLeft: spacing(3),
    [breakpoints.down('xs')]: {
      borderLeft: `3px solid ${border.main}`,
      paddingLeft: spacing(2),
    },
  },
}));

const Indented: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const classes = useIndentedStyles();

  return (
    <Grid container>
      <div className={classes.bar} />
      <div style={{ flex: 1 }}>
        { children }
      </div>
    </Grid>
  );
};

export default Indented;
