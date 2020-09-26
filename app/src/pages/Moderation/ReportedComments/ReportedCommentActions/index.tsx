import React, { useEffect, useState } from 'react';

import { Button, ButtonGroup, makeStyles } from '@material-ui/core';
import { toast } from 'react-toastify';

import useAxios from '../../../../hooks/use-axios';
import { Comment } from '../../../../types/Comment';

import IgnoreReportsConfirmDialog from './IgnoreReportsConfirmDialog';

const useStyles = makeStyles(({ palette }) => ({
  discard: {
    color: palette.textLight.main,
  },
  contact: {
    color: palette.textLight.main,
  },
  delete: {
    color: palette.error.dark,
  },
}));

type ReportCommentActionsProps = {
  comment: Comment;
  onModerated: () => void;
};

const ReportedCommentActions: React.FC<ReportCommentActionsProps> = ({ comment, onModerated }) => {
  const [ignoreReportsDialogOpen, setIgnoreReportsDialogOpen] = useState(false);
  const [{ status: ignoreStatus, loading: ignoreLoading }, executeIgnoreReports] = useAxios(
    { method: 'PUT', url: '/api/moderation/ignore-reports' },
    undefined,
    {
      manual: true,
    },
  );

  const classes = useStyles();

  useEffect(() => {
    if (ignoreStatus(204)) {
      toast.success('Les signalements ont bien été ignorés.');
      onModerated();
    }
  }, [ignoreStatus, onModerated]);

  const handleIgnoreReports = () => {
    executeIgnoreReports({
      data: {
        commentId: comment.id,
      },
    });
  };

  return (
    <>
      <IgnoreReportsConfirmDialog
        open={ignoreReportsDialogOpen}
        comment={comment}
        loading={ignoreLoading}
        onConfirm={handleIgnoreReports}
        onCancel={() => setIgnoreReportsDialogOpen(false)}
      />

      <ButtonGroup>
        <Button size="large" className={classes.discard} onClick={() => setIgnoreReportsDialogOpen(true)}>
          Ignorer
        </Button>

        <Button size="large" className={classes.delete}>
          Supprimer le commentaire
        </Button>

        <Button
          disabled
          size="large"
          className={classes.contact}
          title="Cette fonctionnalité n'est pas encore disponible"
        >
          Contacter {comment.author.nick}
        </Button>
      </ButtonGroup>
    </>
  );
};

export default ReportedCommentActions;
