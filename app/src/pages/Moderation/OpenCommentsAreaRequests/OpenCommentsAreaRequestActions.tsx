import React, { useEffect } from 'react';

import { ButtonGroup, makeStyles } from '@material-ui/core';

import Button from '../../../components/Button';
import useAxios from '../../../hooks/use-axios';

const useRejectOpenCommentsArea = (requestId: number, onRejected: () => void) => {
  const [{ loading, status }, reject] = useAxios({
    method: 'POST',
    url: `/api/comments-area-request/${requestId}/reject`,
  }, { manual: true });

  useEffect(() => {
    if (status(200)) {
      onRejected();
    }
  }, [onRejected, status]);

  return {
    loading,
    onReject: () => reject(),
  };
};

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

type OpenCommentsAreaRequestActionsProps = {
  requestId: number;
  createLoading: boolean;
  onCreate: () => void;
  onRejected: () => void;
};

const OpenCommentsAreaRequestActions: React.FC<OpenCommentsAreaRequestActionsProps> = ({
  requestId,
  createLoading,
  onCreate,
  onRejected,
}) => {
  const { loading, onReject } = useRejectOpenCommentsArea(requestId, onRejected);
  const classes = useStyles();

  return (
    <ButtonGroup className={classes.actions}>
      <Button
        loading={createLoading}
        size="large"
        className={classes.approve}
        onClick={onCreate}
      >
        Ouvrir
      </Button>

      <Button
        loading={loading}
        size="large"
        className={classes.reject}
        onClick={onReject}
      >
        Refuser l'ouverture
      </Button>
    </ButtonGroup>
  );
};

export default OpenCommentsAreaRequestActions;
