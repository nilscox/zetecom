import React from 'react';

import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

import Button from './Button';

type ConfirmDialogProps = {
  open: boolean;
  title: React.ReactNode;
  confirm?: string;
  cancel?: string;
  confirmLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  title,
  confirm = 'Confirmer',
  cancel = 'Annuler',
  confirmLoading,
  onConfirm,
  onCancel,
  children,
}) => {
  return (
    <Dialog open={open} onClose={!confirmLoading && onCancel}>
      <DialogTitle>{ title }</DialogTitle>
      <DialogContent>{ children }</DialogContent>
      <DialogActions>
        <Button size="large" onClick={onCancel}>{ cancel }</Button>
        <Button size="large" loading={confirmLoading} onClick={onConfirm}>{ confirm }</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
