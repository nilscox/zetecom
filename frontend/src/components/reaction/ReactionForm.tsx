import React, { useEffect, useState } from 'react';

import { Subject } from 'src/types/Subject';
import { Reaction } from 'src/types/Reaction';
import { postReaction } from 'src/api/reaction';
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
      <button type="submit" disabled={message.length === 0} onClick={() => {}}>Envoyer</button>
    </Flex>
  );
};

const usePostReaction = () => {
  const [created, setCreated] = useState<Reaction | null>(null);

  return [
    created,
    (data: {
      subjectId: number;
      text: string;
      parentId?: number;
    }) => {
      postReaction(
        data.subjectId,
        data.text,
        data.parentId,
      )
        .then((reaction) => {
          setCreated(reaction);
        })
        .catch((e) => {
          console.error(e);
        });
    },
  ] as const;
};

type ReactionFormProps = {
  subject: Subject;
  parent?: Reaction;
  closeForm?: () => void;
  onCreated: (reaction: Reaction) => void;
};

const ReactionForm: React.FC<ReactionFormProps> = ({ subject, parent, closeForm, onCreated }) => {
  const { colors: { border }, borderRadius } = useTheme();
  const [message, setMessage] = useState('');
  const [created, postReaction] = usePostReaction();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    postReaction({
      subjectId: subject.id,
      text: message,
      parentId: parent.id,
    });
  };

  useEffect(() => void created && onCreated(created), [created]);

  return (
    <form onSubmit={onSubmit}>
      <Flex flexDirection="column" style={{ border: `1px solid ${border}`, borderRadius }}>
        <FormHeader closeForm={closeForm} />
        <MarkdownMessageEdition message={message} setMessage={setMessage} />
        <SubmitButton message={message} />
      </Flex>
    </form>
  );
};

export default ReactionForm;
