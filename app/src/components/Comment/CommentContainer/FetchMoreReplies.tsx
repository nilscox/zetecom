import React from 'react';

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(({ palette }) => ({
  text: {
    color: palette.secondary.main,
    marginTop: 4,
    cursor: 'pointer',
    textAlign: 'center',
  },
}));

type FetchMoreRepliesProps = {
  remainingRepliesCount: number;
  fetchMoreReplies: () => void;
};

const FetchMoreReplies: React.FC<FetchMoreRepliesProps> = ({ remainingRepliesCount, fetchMoreReplies }) => {
  const s = remainingRepliesCount > 1 ? 's' : '';
  const classes = useStyles();

  return (
    <div
      onClick={fetchMoreReplies}
      className={classes.text}
    >
      ▾ &nbsp; { remainingRepliesCount } commentaire{s} restant{s} &nbsp; ▾
    </div>
  );
};

export default FetchMoreReplies;
