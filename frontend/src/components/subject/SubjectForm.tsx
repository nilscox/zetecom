import React, { useState } from 'react';

import { Subject } from 'src/types/Subject';
import { useCurrentUser } from 'src/utils/UserContext';
import { useTheme } from 'src/utils/Theme';
import Flex from 'src/components/common/Flex';
import UserAvatarNick from 'src/components/common/UserAvatarNick';
import MarkdownMessageEdition from 'src/components/common/MarkdownMessageEdition';

const FormHeader: React.FC = () => {
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
    </div>
  );
};

type FormQuoteProps = {
  quote: string;
  setQuote: (quote: string) => void;
};

const FormQuote: React.FC<FormQuoteProps> = ({ quote, setQuote }) => {
  const { sizes: { medium }, colors: { border }, borderRadius } = useTheme();

  return (
    <input
      style={{ margin: medium, padding: medium, border: `1px solid ${border}`, borderRadius }}
      value={quote}
      placeholder="Citation (optionelle)"
      onChange={e => setQuote(e.target.value)}
    />
  );
};

type ReactionFormProps = {
  onSubmit: (subject: Subject) => void;
};

const ReactionForm: React.FC<ReactionFormProps> = ({ onSubmit }) => {
  const { colors: { border }, borderRadius } = useTheme();
  const [quote, setQuote] = useState('');
  const [message, setMessage] = useState('');

  return (
    <Flex flexDirection="column" style={{ border: `1px solid ${border}`, borderRadius }}>
      <FormHeader />
      <FormQuote quote={quote} setQuote={setQuote} />
      <MarkdownMessageEdition message={message} setMessage={setMessage} />
    </Flex>
  );
};

export default ReactionForm;
