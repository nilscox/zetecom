import React from 'react';
import { classList } from '../../utils';

import './UserAvatar.css';

const UserAvatar = ({ user, className, ...props }) => {
  const src = user.avatar
    ? user.avatar
    : '/assets/images/default-avatar.png';

  return (
    <img
      className={classList('user-avatar', className)}
      src={src}
      alt={user.nick} {...props}
    />
  );
};

export default UserAvatar;
