import React, { forwardRef, useImperativeHandle, useCallback, useState } from 'react';

import { Subject } from 'src/types/Subject';
import { Reaction } from 'src/types/Reaction';
import { postReaction, updateReaction } from 'src/api/reaction';
import { useCurrentUser } from 'src/utils/UserContext';
import { useTheme } from 'src/utils/Theme';
import Button from 'src/components/common/Button';
import Box from 'src/components/common/Box';
import Flex from 'src/components/common/Flex';
import Text from 'src/components/common/Text';
import UserAvatarNick from 'src/components/common/UserAvatarNick';
import MarkdownMessageEdition from 'src/components/common/MarkdownMessageEdition';

type FormHeaderProps = {
  closeForm: () => void;
};

const FormHeader: React.FC<FormHeaderProps> = ({ closeForm }) => {
  const { sizes: { medium }, colors: { backgroundLight, borderLight }, borderRadius } = useTheme();
  const user = useCurrentUser();

  if (!user)
    return null;

  return (
    <div
      style={{
        borderTopLeftRadius: borderRadius,
        borderTopRightRadius: borderRadius,
        borderBottom: `1px solid ${borderLight}`,
        backgroundColor: backgroundLight,
        padding: medium,
        position: 'relative',
      }}
    >
      <Box mr={medium} style={{ position: 'absolute', top: 0, right: 0 }}>
        <Text color="textLight" style={{ cursor: 'pointer' }} onClick={closeForm}>×</Text>
      </Box>
      <UserAvatarNick user={user} />
    </div>
  );
};

type SubmitButtonProps = {
  message: string;
};

const SubmitButton: React.FC<SubmitButtonProps> = ({ message }) => {
  const { sizes: { medium, big } } = useTheme();

  return (
    <Flex flexDirection="row" justifyContent="flex-end" px={big} py={medium} style={{ borderTop: '1px solid #CCC' }}>
      <Button type="submit" disabled={message.length === 0}>Envoyer</Button>
    </Flex>
  );
};

type ReactionFormProps = {
  placeholder: string;
  preloadedMessage?: string;
  closeForm?: () => void;
  onSubmit: (message: string) => void;
};

const ReactionForm: React.FC<ReactionFormProps> = (
  { placeholder, preloadedMessage = '', closeForm, onSubmit },
  ref: React.Ref<{}>,
) => {
  const { colors: { border }, borderRadius } = useTheme();
  const [message, setMessage] = useState(preloadedMessage);

  useImperativeHandle(ref, () => ({
    clear: () => setMessage(''),
  }));

  const onSubmitForm = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(message);
  }, [onSubmit, message]);

  return (
    <form onSubmit={onSubmitForm}>
      <Flex flexDirection="column" style={{ border: `1px solid ${border}`, borderRadius }}>
        <FormHeader closeForm={closeForm} />
        <MarkdownMessageEdition placeholder={placeholder} message={message} setMessage={setMessage} />
        <SubmitButton message={message} />
      </Flex>
    </form>
  );
};

const ReactionFormRef = forwardRef(ReactionForm);

type ReactionCreationFormProps = {
  subject: Subject;
  parent?: Reaction;
  closeForm?: () => void;
  onCreated: (reaction: Reaction) => void;
};

const ReactionCreationForm: React.FC<ReactionCreationFormProps> = ({
  subject,
  parent,
  closeForm,
  onCreated,
}) => {
  const formRef = React.useRef(null);

  const onPostReaction = useCallback(async (message: string) => {
    try {
      const created = await postReaction(subject.id, message, parent ? parent.id : undefined);

      onCreated(created);

      if (formRef.current)
        formRef.current.clear();
    } catch (e) {
      console.error(e);
    }
  }, [onCreated, formRef.current]);

  return (
    <ReactionFormRef
      ref={formRef}
      placeholder={
        parent
          ? `Répondez à ${parent.author.nick}`
          : 'Composez votre message...'
      }
      onSubmit={onPostReaction}
      closeForm={closeForm}
    />
  );
};

type ReactionEditionFormProps = {
  reaction: Reaction;
  onEdited: (reaction: Reaction) => void;
  closeForm: () => void;
};

export const ReactionEditionForm: React.FC<ReactionEditionFormProps> = ({ reaction, onEdited, closeForm }) => {
  const formRef = React.useRef(null);

  const onEditReaction = useCallback(async (message: string) => {
    try {
      const edited = await updateReaction(reaction.id, message);

      onEdited(edited);

      if (formRef.current)
        formRef.current.clear();
    } catch (e) {
      console.error(e);
    }
  }, [onEdited, formRef.current]);

  return (
    <ReactionFormRef
      ref={formRef}
      placeholder="Éditez votre message..."
      preloadedMessage={reaction.text}
      onSubmit={onEditReaction}
      closeForm={closeForm}
    />
  );
};

export default ReactionCreationForm;
