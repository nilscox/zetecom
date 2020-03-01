import React from 'react';

import Box from 'src/components/common/Box';
import Flex from 'src/components/common/Flex';
import Text from 'src/components/common/Text';
import UserAvatar from 'src/components/common/UserAvatar';
import { UserLight } from 'src/types/User';
import { useTheme } from 'src/utils/Theme';

type UserAvatarNickProps = {
  small?: boolean;
  user: UserLight;
};

const UserAvatarNick: React.FC<UserAvatarNickProps> = ({ small, user }) => {
  const { sizes: { big } } = useTheme();

  return (
    <Flex flexDirection="row" alignItems="center">
      <UserAvatar editable small={small} user={user} />
      <Box ml={big}>
        <Text bold>{ user.nick }</Text>
      </Box>
    </Flex>
  );
};

export default UserAvatarNick;
