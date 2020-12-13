import React from 'react';

import { makeStyles } from '@material-ui/core';

import Button from '../../../components/Button';

const useStyles = makeStyles(({ palette, spacing }) => ({
  actions: {
    marginTop: spacing(2),
  },
  approve: {
    margin: spacing(2, 0),
    color: palette.success.dark,
  },
  reject: {
    margin: spacing(2, 0),
    color: palette.error.dark,
  },
}));

type CommentsAreaRequestModerationActions = {
  createLoading: boolean;
  rejectLoading: boolean;
  onReject: () => void;
};

const CommentsAreaRequestModerationActions: React.FC<CommentsAreaRequestModerationActions> = ({
  createLoading,
  rejectLoading,
  onReject,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.actions}>
      <Button type="submit" loading={createLoading} size="medium" className={classes.approve}>
        Ouvrir
      </Button>

      <Button loading={rejectLoading} size="medium" className={classes.reject} onClick={onReject}>
        Refuser l'ouverture
      </Button>
    </div>
  );
};

export default CommentsAreaRequestModerationActions;
