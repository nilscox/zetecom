import React from 'react';

import { Typography } from '@material-ui/core';
import dayjs from 'dayjs';

const DATE_FORMAT = '[Le] DD.MM.YYYY [à] HH:mm';

type EditionDateProps = {
  edited: boolean;
  date: Date;
  onViewHistory: () => void;
};

const EditionDate: React.FC<EditionDateProps> = ({ edited, date, onViewHistory }) => {
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
      style={{ fontStyle: 'oblique', cursor: 'pointer' }}
      onClick={onViewHistory}
    >
      *&nbsp;{ dayjs(date).format(DATE_FORMAT) }
    </Typography>
  );
};

export default EditionDate;
