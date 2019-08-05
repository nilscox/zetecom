import React, { useState } from 'react';

import { Reaction } from 'src/types/Reaction';
import { useCurrentUser } from 'src/utils/UserContext';
import { useTheme } from 'src/utils/Theme';
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
  parent?: Reaction;
  closeForm?: () => void;
};

const ReactionForm: React.FC<ReactionFormProps> = ({ parent, closeForm }) => {
  const { colors: { border }, borderRadius } = useTheme();
  const [message, setMessage] = useState('');

  return (
    <Flex flexDirection="column" style={{ border: `1px solid ${border}`, borderRadius }}>
      <FormHeader closeForm={closeForm} />
      <MarkdownMessageEdition message={message} setMessage={setMessage} />
    </Flex>
  );
};

export default ReactionForm;
