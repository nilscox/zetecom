import React from 'react';

import { Reaction } from 'src/types/Reaction';
import { useTheme } from 'src/utils/Theme';
import Box from 'src/components/common/Box';
import Flex from 'src/components/common/Flex';
import Text from 'src/components/common/Text';
import UserAvatar from 'src/components/common/UserAvatar';

type ReactionHeaderProps = {
  author: Reaction['author'];
  edited: Reaction['edited'];
};

const ReactionHeader: React.FC<ReactionHeaderProps> = ({ author, edited }) => {
  const { sizes: { medium, big }, colors: { backgroundLight, borderLight }, borderRadius } = useTheme();

  return (
    <div
      style={{
        background: backgroundLight,
        borderBottom: `1px solid ${borderLight}`,
        borderTopLeftRadius: borderRadius,
        borderTopRightRadius: borderRadius,
        padding: medium,
      }}
    >
      <Flex flexDirection="row" alignItems="center">
        <UserAvatar user={author} />
        <Box ml={big}>
          <Text size="big" style={{ fontWeight: 'bold' }}>{ author.nick }</Text>
        </Box>
      </Flex>
    </div>
  );
};

export default ReactionHeader;
