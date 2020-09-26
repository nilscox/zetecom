import React from 'react';

import { Typography } from '@material-ui/core';

import CommentBody from '../../../../components/Comment/CommentBody';
import Indented from '../../../../components/Comment/CommentContainer/Indented';
import ConfirmDialog from '../../../../components/ConfirmDialog';
import Padding from '../../../../components/Padding';
import { Comment } from '../../../../types/Comment';

type IgnoreReportsConfirmDialogProps = {
  open: boolean;
  comment: Comment;
  loading: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

const IgnoreReportsConfirmDialog: React.FC<IgnoreReportsConfirmDialogProps> = ({
  open,
  comment,
  loading,
  onConfirm,
  onCancel,
}) => {
  return (
    <ConfirmDialog
      open={open}
      title="Ignorer les signalements"
      confirmLoading={loading}
      onConfirm={onConfirm}
      onCancel={onCancel}
    >
      <Typography>
        Vous avez choisi d'<strong>ignorer</strong> tous les signalements liés à ce commentaire. Voulez-vous continuer ?
      </Typography>
      <Padding y>
        <Indented>
          <CommentBody {...comment} />
        </Indented>
      </Padding>
    </ConfirmDialog>
  );
};

export default IgnoreReportsConfirmDialog;
