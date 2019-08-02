import React from 'react';

import { Reaction } from 'src/types/Reaction';
import { useTheme } from 'src/utils/Theme';
import Box from 'src/components/common/Box';
import Flex from 'src/components/common/Flex';
import UserAvatar from 'src/components/common/UserAvatar';

type ReactionHeaderProps = {
  author: Reaction['author'];
  edited: Reaction['edited'];
};

const ReactionHeader: React.FC<ReactionHeaderProps> = ({ author, edited }) => {
  const { sizes: { big }, colors: { backgroundLight, borderLight }, borderRadius } = useTheme();

  return (
    <div
      style={{
        background: backgroundLight,
        borderBottomColor: borderLight,
        borderRadius,
      }}
    >
      <Flex flexDirection="row" alignItems="center">
        <UserAvatar user={author} />
        <Box ml={big}>
          <span style={{ fontWeight: 'bold' }}>{ author.nick }</span>
        </Box>
      </Flex>
    </div>
  );
};

export default ReactionHeader;
