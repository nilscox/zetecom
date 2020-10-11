import React, { useEffect, useState } from 'react';

import { Button, ButtonGroup, makeStyles } from '@material-ui/core';
import { toast } from 'react-toastify';

import useAxios from '../../../../hooks/use-axios';
import { Comment } from '../../../../types/Comment';

import DeletCommentConfirmDialog from './DeleteCommentConfirmDialog';
import IgnoreReportsConfirmDialog from './IgnoreReportsConfirmDialog';

const useIgnoreReports = (comment: Comment, onModerated: () => void) => {
  const [ignoreReportsDialogOpen, setIgnoreReportsDialogOpen] = useState(false);
  const [{ status, loading: ignoreLoading }, ignoreReports] = useAxios(
    {
      method: 'PUT',
      url: '/api/moderation/ignore-reports',
      data: {
        commentId: comment.id,
      },
    },
    {
      manual: true,
    },
  );

  useEffect(() => {
    if (status(204)) {
      toast.success('Les signalements ont bien été ignorés.');
      setIgnoreReportsDialogOpen(false);
      onModerated();
    }
  }, [status, onModerated]);

  return { ignoreReportsDialogOpen, setIgnoreReportsDialogOpen, ignoreLoading, ignoreReports, ignored: status(204) };
};

const useDeleteComment = (comment: Comment, onModerated: () => void) => {
  const [deleteCommentDialogOpen, setDeleteCommentDialogOpen] = useState(false);

  const [{ status, loading: deleteLoading }, deleteComment] = useAxios(
    {
      method: 'PUT',
      url: '/api/moderation/delete-comment',
      data: {
        commentId: comment.id,
      },
    },
    {
      manual: true,
    },
  );

  useEffect(() => {
    if (status(204)) {
      toast.success('Le commentaire a bien été supprimé.');
      setDeleteCommentDialogOpen(false);
      onModerated();
    }
  }, [status, onModerated]);

  return { deleteCommentDialogOpen, setDeleteCommentDialogOpen, deleteLoading, deleteComment, deleted: status(204) };
};

const useStyles = makeStyles(({ palette }) => ({
  discard: {
    color: palette.text.secondary,
  },
  contact: {
    color: palette.text.secondary,
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
  const {
    ignoreReportsDialogOpen,
    setIgnoreReportsDialogOpen,
    ignoreLoading,
    ignoreReports,
    ignored,
  } = useIgnoreReports(comment, onModerated);

  const {
    deleteCommentDialogOpen,
    setDeleteCommentDialogOpen,
    deleteLoading,
    deleteComment,
    deleted,
  } = useDeleteComment(comment, onModerated);

  const classes = useStyles();

  return (
    <>
      <IgnoreReportsConfirmDialog
        open={ignoreReportsDialogOpen}
        comment={comment}
        loading={ignoreLoading}
        onConfirm={ignoreReports}
        onCancel={() => setIgnoreReportsDialogOpen(false)}
      />

      <DeletCommentConfirmDialog
        open={deleteCommentDialogOpen}
        comment={comment}
        loading={deleteLoading}
        onConfirm={deleteComment}
        onCancel={() => setDeleteCommentDialogOpen(false)}
      />

      <ButtonGroup>
        <Button
          size="large"
          variant={ignored ? 'contained' : undefined}
          className={classes.discard}
          onClick={() => setIgnoreReportsDialogOpen(true)}
        >
          Ignorer
        </Button>

        <Button
          size="large"
          variant={deleted ? 'contained' : undefined}
          className={classes.delete}
          onClick={() => setDeleteCommentDialogOpen(true)}
        >
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
