import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  separator: {
    margin: theme.spacing(2, 0),
    border: 0,
    borderBottom: `1px solid ${theme.palette.border.main}`,
  },
}));

const Separator: React.FC = () => {
  const classes = useStyles();

  return (
    <hr className={classes.separator} />
  );
};

export default Separator;
