import { createUser } from '@zetecom/app-core';

import { dougForcett } from '~/fixtures';

import { Demo } from '../../../demos';

import { Avatar, AvatarNick } from './Avatar';

const davidBowie = createUser({
  avatar: 'https://cdn.pixabay.com/photo/2019/02/28/10/36/david-bowie-4025712_960_720.png',
});

export const user: Demo = {
  description: "A user's avatar image",
  render: () => <Avatar user={davidBowie} />,
};

export const small: Demo = {
  description: 'Small avatar image',
  render: () => <Avatar size="small" user={davidBowie} />,
};

export const defaultAvatar: Demo = {
  description: 'Default avatar image',
  render: () => <Avatar user={createUser()} />,
};

export const avatarNick: Demo = {
  description: "Avatar with the user's nick",
  render: () => <AvatarNick user={dougForcett} />,
};
