import React from 'react';

import { Reaction } from 'src/types/Reaction';
import { useCurrentUser } from 'src/utils/UserContext';
import { useTheme } from 'src/utils/Theme';
import Box from 'src/components/common/Box';
import Text from 'src/components/common/Text';
import UserAvatarNick from 'src/components/common/UserAvatarNick';

type ReactionFormHeaderProps = {
  closeForm: () => void;
};

const ReactionFormHeader: React.FC<ReactionFormHeaderProps> = ({ closeForm }) => {
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

type ReactionFormProps = {
  parent?: Reaction;
  closeForm?: () => void;
};

const ReactionForm: React.FC<ReactionFormProps> = ({ parent, closeForm }) => {
  const { colors: { border }, borderRadius } = useTheme();

  return (
    <div style={{ border: `1px solid ${border}`, borderRadius }}>
      <ReactionFormHeader closeForm={closeForm} />
    </div>
  );
};

export default ReactionForm;
