import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import PrevIcon from '@material-ui/icons/NavigateBefore';
import NextIcon from '@material-ui/icons/NavigateNext';

import Select from 'src/components/Select';

const useStyles = makeStyles(({ spacing }) => ({
  revision: {
    marginTop: spacing(2),
  },
}));

type RevisionSelectionProps = {
  revisionsCount: number;
  revision: number;
  setRevision: (revision: number) => void;
};

const RevisionSelection: React.FC<RevisionSelectionProps> = ({ revisionsCount, revision, setRevision }) => {
  const classes = useStyles();

  const prevRevision = () => setRevision(revision - 1);
  const nextRevision = () => setRevision(revision + 1);

  return (
    <div className={classes.revision}>
      <label htmlFor="version">Version</label>
      <IconButton disabled={revision <= 1} onClick={prevRevision} title="Version précédente">
        <PrevIcon />
      </IconButton>
      <Select id="version" value={revision} onChange={e => setRevision(Number(e.currentTarget.value))}>
        {Array(revisionsCount)
          .fill(null)
          .map((_, n) => n + 1)
          .map(n => (
            <option key={n} value={n}>
              {n} {'->'} {n + 1}
            </option>
          ))}
      </Select>
      <IconButton disabled={revision >= revisionsCount} onClick={nextRevision} title="Version suivante">
        <NextIcon />
      </IconButton>
    </div>
  );
};

export default RevisionSelection;
