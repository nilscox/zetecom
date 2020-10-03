import React, { forwardRef, useCallback, useImperativeHandle, useState } from 'react';

import { Grid, Paper, Theme, useMediaQuery } from '@material-ui/core';

import MarkdownMessageEdition from 'src/components/MarkdownMessageEdition';

import FormFooter from './FormFooter';
import FormHeader from './FormHeader';

export type ClearFormRef = { clear: () => void };

type CommentFormProps = {
  placeholder: string;
  preloadedMessage?: string;
  loading: boolean;
  closeForm?: () => void;
  onSubmit: (message: string) => void;
};

const CommentForm = forwardRef((
  { placeholder, preloadedMessage = '', loading, closeForm, onSubmit }: CommentFormProps,
  ref: React.Ref<ClearFormRef>,
) => {
  const small = useMediaQuery<Theme>(theme => theme.breakpoints.down('xs'));

  const [message, setMessage] = useState(preloadedMessage);

  useImperativeHandle(ref, () => ({
    clear: () => setMessage(''),
  }));

  const onSubmitForm = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(message);
  }, [onSubmit, message]);

  return (
    <form className="comment-form" onSubmit={onSubmitForm}>
      <Paper elevation={small ? 1 : 2}>
        <Grid container direction="column">
          <FormHeader closeForm={closeForm} />
          <MarkdownMessageEdition placeholder={placeholder} message={message} setMessage={setMessage} />
          <FormFooter disabled={loading || message.length === 0} />
        </Grid>
      </Paper>
    </form>
  );
});

CommentForm.displayName = 'CommentForm';

export default CommentForm;
