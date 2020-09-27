import React from 'react';

import { makeStyles, Theme, Typography } from '@material-ui/core';
import dayjs from 'dayjs';

const DATE_FORMAT = '[Le] DD.MM.YYYY [à] HH:mm';

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
  const classes = useStyles({ canViewHistory: Boolean(onViewHistory) });

  if (!edited) {
    return (
      <Typography variant="caption">
        { dayjs(date).format(DATE_FORMAT) }
      </Typography>
    );
  }

  return (
    <Typography
      variant="caption"
      title="Édité"
      className={classes.edited}
      onClick={onViewHistory}
    >
      *&nbsp;{ dayjs(date).format(DATE_FORMAT) }
    </Typography>
  );
};

export default EditionDate;
