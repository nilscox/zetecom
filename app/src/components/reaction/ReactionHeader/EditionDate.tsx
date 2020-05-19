import React from 'react';

import moment from 'moment';

import { Typography } from '@material-ui/core';

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
        { moment(date).format(DATE_FORMAT) }
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
      *&nbsp;{ moment(date).format(DATE_FORMAT) }
    </Typography>
  );
};

export default EditionDate;
