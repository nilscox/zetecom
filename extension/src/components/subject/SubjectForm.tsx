import React, { useState, useEffect } from 'react';
import { AxiosRequestConfig } from 'axios';

import { Subject, parseSubject } from 'src/types/Subject';
import { useCurrentUser } from 'src/utils/UserContext';
import { useTheme } from 'src/utils/Theme';
import { useInformation } from 'src/utils/InformationContext';
import useAxios from 'src/hooks/use-axios';

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
  onCreated: (subject: Subject) => void;
  onClose: () => void;
};

const SubjectForm: React.FC<SubjectFormProps> = ({ onCreated, onClose }) => {
  const information = useInformation();

  const { colors: { border }, borderRadius } = useTheme();
  const [subject, setSubject] = useState('');
  const [quote, setQuote] = useState('');
  const [message, setMessage] = useState('');

  const opts: AxiosRequestConfig = { method: 'post', url: '/api/subject' };
  const [{ data: created, loading, error }, postSubject] = useAxios(opts, parseSubject, { manual: true });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    postSubject({ data: { informationId: information.id, subject, quote, text: message } });
  };

  useEffect(() => {
    if (created)
      onCreated(created);
  // prevent infinite recursion due to `onCreated` being changed when called
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [created]);

  if (error)
    throw error;

  return (
    <form className="subject-form" onSubmit={onSubmit}>
      <Flex flexDirection="column" border={`1px solid ${border}`} borderRadius={borderRadius}>
        <FormHeader onClose={onClose} />
        <FormSubject subject={subject} setSubject={setSubject} />
        <FormQuote quote={quote} setQuote={setQuote} />
        <MarkdownMessageEdition placeholder="Description du sujet..." message={message} setMessage={setMessage} />
        <SubmitButton loading={loading} disabled={subject.length === 0 || message.length === 0} />
      </Flex>
    </form>
  );
};

export default SubjectForm;
