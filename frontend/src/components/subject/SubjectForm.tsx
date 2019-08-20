import React, { useState } from 'react';

import { Subject } from 'src/types/Subject';
import { usePostSubject } from 'src/api/subjects';
import { useCurrentUser } from 'src/utils/UserContext';
import { useTheme } from 'src/utils/Theme';
import Flex from 'src/components/common/Flex';
import Box from 'src/components/common/Box';
import Button, { ButtonProps } from 'src/components/common/Button';
import Input from 'src/components/common/Input';
import Text from 'src/components/common/Text';
import UserAvatarNick from 'src/components/common/UserAvatarNick';
import MarkdownMessageEdition from 'src/components/common/MarkdownMessageEdition';

type FormHeaderProps = {
  onClose: () => void;
};

const FormHeader: React.FC<FormHeaderProps> = ({ onClose }) => {
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
      <UserAvatarNick user={user} />
      <Box mr={medium} style={{ position: 'absolute', top: 0, right: 0 }}>
        <Text color="textLight" style={{ cursor: 'pointer' }} onClick={onClose}>×</Text>
      </Box>
    </div>
  );
};

type FormSubjectProps = {
  subject: string;
  setSubject: (subject: string) => void;
};

const FormSubject: React.FC<FormSubjectProps> = ({ subject, setSubject }) => {
  const { sizes: { medium } } = useTheme();

  return (
    <Input
      style={{ margin: medium }}
      value={subject}
      placeholder="Sujet"
      onChange={e => setSubject(e.currentTarget.value)}
    />
  );
};

type FormQuoteProps = {
  quote: string;
  setQuote: (quote: string) => void;
};

const FormQuote: React.FC<FormQuoteProps> = ({ quote, setQuote }) => {
  const { sizes: { medium } } = useTheme();

  return (
    <Input
      style={{ margin: medium }}
      value={quote}
      placeholder="Citation (optionelle)"
      onChange={e => setQuote(e.currentTarget.value)}
    />
  );
};

type SubmitButtonProps = ButtonProps;

const SubmitButton: React.FC<SubmitButtonProps> = (props) => {
  const { sizes: { medium, big } } = useTheme();

  return (
    <Flex flexDirection="row" justifyContent="flex-end" px={big} py={medium} style={{ borderTop: '1px solid #CCC' }}>
      <Button type="submit" {...props}>Envoyer</Button>
    </Flex>
  );
};

type SubjectFormProps = {
  informationId: number;
  onCreated: (subject: Subject) => void;
  onClose: () => void;
};

const SubjectForm: React.FC<SubjectFormProps> = ({ informationId, onCreated, onClose }) => {
  const { colors: { border }, borderRadius } = useTheme();
  const [subject, setSubject] = useState('');
  const [quote, setQuote] = useState('');
  const [message, setMessage] = useState('');

  const [
    postSubject,
    { loading: postSubjectLoading, error: postSubjectError },
  ] = usePostSubject();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onCreated(await postSubject(informationId, subject, quote, message));
  };

  if (postSubjectError)
    throw postSubjectError;

  return (
    <form onSubmit={onSubmit}>
      <Flex flexDirection="column" style={{ border: `1px solid ${border}`, borderRadius }}>
        <FormHeader onClose={onClose} />
        <FormSubject subject={subject} setSubject={setSubject} />
        <FormQuote quote={quote} setQuote={setQuote} />
        <MarkdownMessageEdition placeholder="Description du sujet..." message={message} setMessage={setMessage} />
        <SubmitButton loading={postSubjectLoading} disabled={subject.length === 0 || message.length === 0} />
      </Flex>
    </form>
  );
};

export default SubjectForm;
