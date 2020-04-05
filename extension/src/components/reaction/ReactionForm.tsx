/* eslint-disable max-lines */

import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';

import { AxiosRequestConfig } from 'axios';
import clsx from 'clsx';

import Box from 'src/components/common/Box';
import Button from 'src/components/common/Button';
import Flex from 'src/components/common/Flex';
import MarkdownMessageEdition from 'src/components/common/MarkdownMessageEdition';
import Text from 'src/components/common/Text';
import UserAvatarNick from 'src/components/common/UserAvatarNick';
import useAxios from 'src/hooks/use-axios';
import { parseReaction, Reaction } from 'src/types/Reaction';
import { useInformation } from 'src/utils/InformationContext';
import { useTheme } from 'src/utils/Theme';
import { useCurrentUser } from 'src/utils/UserContext';

import { Paper } from '@material-ui/core';

type FormHeaderProps = {
  closeForm?: () => void;
};

const FormHeader: React.FC<FormHeaderProps> = ({ closeForm }) => {
  const { sizes: { medium }, colors: { borderLight } } = useTheme();
  const user = useCurrentUser();

  if (!user)
    return null;

  return (
    <div
      style={{
        borderTop: `1px solid ${borderLight}`,
        borderBottom: `1px solid ${borderLight}`,
        padding: medium,
        position: 'relative',
      }}
      className="MuiPaper-rounded"
    >
      { closeForm && (
        <Box mr={medium} style={{ position: 'absolute', top: 0, right: 0 }}>
          <Text color="textLight" style={{ cursor: 'pointer' }} onClick={closeForm}>×</Text>
        </Box>
      ) }
      <UserAvatarNick user={user} />
    </div>
  );
};

type SubmitButtonProps = {
  loading: boolean;
  disabled: boolean;
};

const SubmitButton: React.FC<SubmitButtonProps> = ({ loading, disabled }) => {
  const { colors: { border }, sizes: { medium, big } } = useTheme();

  return (
    <Flex
      flexDirection="row"
      justifyContent="flex-end"
      px={big}
      py={medium}
      style={{ borderTop: `1px solid ${border}` }}
    >
      <Button type="submit" loading={loading} disabled={disabled}>Envoyer</Button>
    </Flex>
  );
};

type ReactionFormProps = {
  className?: string;
  placeholder: string;
  preloadedMessage?: string;
  loading: boolean;
  closeForm?: () => void;
  onSubmit: (message: string) => void;
};

const ReactionForm: React.FC<ReactionFormProps> = (
  { className, placeholder, preloadedMessage = '', loading, closeForm, onSubmit },
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
    <form className={clsx('reaction-form', className)} onSubmit={onSubmitForm}>
      <Paper elevation={2}>
        <Flex flexDirection="column">
          <FormHeader closeForm={closeForm} />
          <MarkdownMessageEdition placeholder={placeholder} message={message} setMessage={setMessage} />
          <SubmitButton loading={loading} disabled={message.length === 0} />
        </Flex>
      </Paper>
    </form>
  );
};

const ReactionFormRef = forwardRef(ReactionForm);

type ReactionCreationFormProps = {
  className?: string;
  parent?: Reaction;
  closeForm?: () => void;
  onCreated: (reaction: Reaction) => void;
};

const ReactionCreationForm: React.FC<ReactionCreationFormProps> = ({
  className,
  parent,
  closeForm,
  onCreated,
}) => {
  const information = useInformation();

  const formRef = React.useRef(null);

  const opts: AxiosRequestConfig = { method: 'POST', url: '/api/reaction' };
  const [{ data, loading, error }, postReaction] = useAxios(opts, parseReaction, { manual: true });

  if (error)
    throw error;

  const onSubmit = (text: string) => postReaction({
    data: {
      informationId: information.id,
      parentId: parent ? parent.id : undefined,
      text,
    },
  });

  useEffect(() => {
    if (data) {
      onCreated(data);

      if (formRef.current)
        formRef.current.clear();
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, formRef]);

  return (
    <ReactionFormRef
      ref={formRef}
      className={className}
      placeholder={
        parent
          ? `Répondez à ${parent.author.nick}`
          : 'Composez votre message...'
      }
      loading={loading}
      onSubmit={onSubmit}
      closeForm={closeForm}
    />
  );
};

type ReactionEditionFormProps = {
  reaction: Reaction;
  onEdited: (reaction: Reaction) => void;
  closeForm?: () => void;
};

export const ReactionEditionForm: React.FC<ReactionEditionFormProps> = ({ reaction, onEdited, closeForm }) => {
  const formRef = React.useRef(null);

  const opts: AxiosRequestConfig = { method: 'PUT', url: '/api/reaction/' + reaction.id };
  const [{ data, loading, error }, postReaction] = useAxios(opts, parseReaction, { manual: true });

  if (error)
    throw error;

  const onSubmit = (text: string) => postReaction({ data: { text } });

  useEffect(() => {
    if (data) {
      onEdited(data);

      if (formRef.current)
        formRef.current.clear();
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, onEdited, formRef]);

  return (
    <ReactionFormRef
      ref={formRef}
      placeholder="Éditez votre message..."
      preloadedMessage={reaction.text}
      loading={loading}
      onSubmit={onSubmit}
      closeForm={closeForm}
    />
  );
};

export default ReactionCreationForm;
