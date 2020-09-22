import React from 'react';

import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(({ spacing }) => ({
  section: {
    margin: spacing(12, 0),
    padding: spacing(4, 4),
  },
  sectionTitle: {
    marginBottom: spacing(6),
  },
}));

type SectionProps = {
  title: React.ReactNode;
};

const Section: React.FC<SectionProps> = ({ title, children }) => {
  const classes = useStyles();

  return (
    <div className={classes.section}>
      <Typography variant="h3" className={classes.sectionTitle}>{title}</Typography>
      { children }
    </div>
  );
};

export default Section;
