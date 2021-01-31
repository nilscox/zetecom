import React from 'react';

import { makeStyles, Theme, Typography } from '@material-ui/core';

import useDateFormat, { DATE_FORMAT_DAY_HOUR } from 'src/hooks/useDateFormat';

const useStyles = makeStyles<Theme, { canViewHistory: boolean }>(() => ({
  edited: ({ canViewHistory }) => ({
    fontStyle: 'italic',
    cursor: canViewHistory ? 'pointer' : 'inherit',
  }),
}));

type EditionDateProps = {
  edited: boolean;
  date: Date;
  onViewHistory?: () => void;
};

const EditionDate: React.FC<EditionDateProps> = ({ edited, date, onViewHistory }) => {
  const format = useDateFormat(DATE_FORMAT_DAY_HOUR);
  const classes = useStyles({ canViewHistory: Boolean(onViewHistory) });

  if (!edited) {
    return <Typography variant="caption">{format(date)}</Typography>;
  }

  return (
    <Typography variant="caption" title="Édité" className={classes.edited} onClick={onViewHistory}>
      * {format(date)}
    </Typography>
  );
};

export default EditionDate;
