import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import makeDiff from 'src/components/DiffView/makeDiff';

const useStyles = makeStyles(({ palette, spacing }) => ({
  line: {
    display: 'flex',
    margin: spacing(2, 0),
  },
  left: {
    flex: 1,
  },
  right: {
    flex: 1,
  },
  separator: {
    borderLeft: `1px solid ${palette.grey[400]}`,
    margin: spacing(-1, 2),
  },
}));

const DiffChunk: React.FC<{ chunk: Diff.Change }> = ({ chunk: { value, added, removed } }) => {
  if (added) {
    return <ins>{value}</ins>;
  } else if (removed) {
    return <del>{value}</del>;
  }

  return <>{value}</>;
};

const DiffLine: React.FC<{ chunks: Diff.Change[] }> = ({ chunks }) => (
  <>
    {chunks.map((chunk, n) => (
      <DiffChunk key={n} chunk={chunk} />
    ))}
  </>
);

type DiffRevisionProps = {
  before: string;
  after: string;
};

const DiffRevision: React.FC<DiffRevisionProps> = ({ before, after }) => {
  const lines = makeDiff(before, after, { simplify: true, group: true });
  const classes = useStyles();

  return (
    <>
      {lines.map(([left, right], n) => (
        <div key={n} className={`line line-${n} ${classes.line}`}>
          <div className={`left ${classes.left}`}>
            <DiffLine chunks={left} />
          </div>
          <div className={classes.separator}></div>
          <div className={`right ${classes.right}`}>
            <DiffLine chunks={right} />
          </div>
        </div>
      ))}
    </>
  );
};

export default DiffRevision;
