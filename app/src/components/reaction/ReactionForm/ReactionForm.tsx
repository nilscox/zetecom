import React, { forwardRef, useCallback, useImperativeHandle, useState } from 'react';

import MarkdownMessageEdition from 'src/components/common/MarkdownMessageEdition';

import FormFooter from './FormFooter';
import FormHeader from './FormHeader';

import { Grid, Paper } from '@material-ui/core';

type ReactionFormProps = {
  placeholder: string;
  preloadedMessage?: string;
  loading: boolean;
  closeForm?: () => void;
  onSubmit: (message: string) => void;
};

const ReactionForm = forwardRef((
  { placeholder, preloadedMessage = '', loading, closeForm, onSubmit }: ReactionFormProps,
  ref: React.Ref<{}>,
) => {
  const [message, setMessage] = useState(preloadedMessage);

  useImperativeHandle(ref, () => ({
    clear: () => setMessage(''),
  }));

  const onSubmitForm = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(message);
  }, [onSubmit, message]);

  return (
    <form className="reaction-form" onSubmit={onSubmitForm}>
      <Paper elevation={2}>
        <Grid container direction="column">
          <FormHeader closeForm={closeForm} />
          <MarkdownMessageEdition placeholder={placeholder} message={message} setMessage={setMessage} />
          <FormFooter disabled={loading || message.length === 0} />
        </Grid>
      </Paper>
    </form>
  );
});

ReactionForm.displayName = 'ReactionForm';

export default ReactionForm;
