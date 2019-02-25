import React from 'react';

import { classList } from 'utils';

import './UserAvatar.css';

const UserAvatar = ({ user, className, ...props }) => (
  <img
    className={classList('user-avatar', className)}
    src={user.avatar}
    alt={user.nick}
    {...props}
  />
);

export default UserAvatar;
