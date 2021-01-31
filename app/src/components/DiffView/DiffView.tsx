import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { UserAvatarNick } from 'src/components/UserAvatar';
import useDateFormat, { DATE_FORMAT_DAY_HOUR } from 'src/hooks/useDateFormat';
import { UserLight } from 'src/types/User';

import DiffRevision from './DiffRevision';
import RevisionSelection from './RevisionSelection';

const useStyles = makeStyles(({ spacing }) => ({
  userAvatar: {
    margin: spacing(4, 0),
  },
  diff: {
    padding: spacing(1),
    backgroundColor: '#fafafa',
    fontFamily: 'monospace',
    '& ins': {
      textDecoration: 'none',
      backgroundColor: '#4ddf5933',
    },
    '& del': {
      textDecoration: 'none',
      backgroundColor: '#df4d4d33',
    },
  },
  dates: {
    display: 'flex',
    flexDirection: 'row',
  },
  date: {
    flex: 1,
    textAlign: 'center',
    margin: spacing(2, 0),
  },
}));

type DiffViewProps = {
  className?: string;
  history: { text: string; date: Date }[];
  author: UserLight;
};

const DiffView: React.FC<DiffViewProps> = ({ className, history, author }) => {
  const revisionsCount = history.length - 1;
  const [revision, setRevision] = useState(revisionsCount);
  const classes = useStyles();
  const formatDate = useDateFormat(DATE_FORMAT_DAY_HOUR);

  const before = history[history.length - revision];
  const after = history[history.length - revision - 1];

  return (
    <div className={className}>
      <Typography variant="h1">Historique d'édition</Typography>
      <UserAvatarNick user={author} className={classes.userAvatar} />
      <div className={classes.dates}>
        <div className={classes.date}>{formatDate(before.date)}</div>
        <div className={classes.date}>{formatDate(after.date)}</div>
      </div>
      <div className={`diff ${classes.diff}`}>
        <DiffRevision before={before.text} after={after.text} />
      </div>
      <RevisionSelection revisionsCount={revisionsCount} revision={revision} setRevision={setRevision} />
    </div>
  );
};

export default DiffView;
