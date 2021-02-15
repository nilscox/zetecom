import React from 'react';

import styled from '@emotion/styled';

import AvatarImage from 'src/components/elements/AvatarImage/AvatarImage';
import { fontWeight, spacing } from 'src/theme';
import { UserLight } from 'src/types/User';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Nick = styled.div`
  margin-left: ${spacing(2)};
  font-weight: ${fontWeight('bold')};
`;

type UserAvatarNickProps = {
  small?: boolean;
  user: UserLight;
};

const UserAvatarNick: React.FC<UserAvatarNickProps> = ({ small, user }) => {
  return (
    <Container>
      <AvatarImage small={small} src={user.avatar} />
      <Nick>{user.nick}</Nick>
    </Container>
  );
};

export default UserAvatarNick;
