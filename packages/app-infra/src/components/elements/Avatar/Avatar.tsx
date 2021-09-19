import React from 'react';

import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { User } from '@zetecom/app-core';

import { Text } from '~/components/elements/Text/Text';
import { Flex } from '~/components/layout/Flex/Flex';
import { border, color, fontSize, spacing } from '~/theme';

import defaultAvatar from './default-avatar.png';

type AvatarProps = {
  user?: User;
  size?: 'small';
  loading?: boolean;
  badge?: string;
};

export const Avatar: React.FC<AvatarProps> = ({ user, size, loading, badge }) => (
  <Container>
    <StyledAvatar src={user?.avatar ?? defaultAvatar} size={size} />
    {loading && <LoadingIndicator />}
    {badge !== undefined && <Badge>{badge}</Badge>}
  </Container>
);

const Container = styled.div`
  position: relative;
`;

const StyledAvatar = styled.img<{ size?: 'small' }>`
  width: ${({ size }) => spacing(size === 'small' ? 5 : 6)};
  height: ${({ size }) => spacing(size === 'small' ? 5 : 6)};
  display: block;
  border: ${border()};
  border-radius: 50%;
  object-fit: cover;
`;

const loading = keyframes`
  0% { transform: rotate(0deg) }
  100% { transform: rotate(360deg) }
`;

const LoadingIndicator = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border-top: 2px solid ${color('primary')};
  border-radius: 50%;
  animation: ${loading} 750ms linear infinite;
`;

const Badge = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin-top: -${spacing(2)};
  margin-right: -${spacing(2)};
  background-color: ${color('primary')};
  border-radius: 50%;
  width: ${spacing(4)};
  height: ${spacing(4)};
  color: ${color('muted')};
  font-size: ${fontSize(1)};
`;

type AvatarNickProps = {
  size?: 'small';
  user: User;
};

export const AvatarNick: React.FC<AvatarNickProps> = ({ user, size }) => (
  <Flex direction="row" alignItems="center">
    <Avatar size={size} user={user} />
    <Text marginLeft={size === 'small' ? 2 : 3} fontSize={size === 'small' ? 2 : 3} fontWeight="medium">
      {user.nick}
    </Text>
  </Flex>
);
