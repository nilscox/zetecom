import React from 'react';

import { classList } from 'utils';

import './UserAvatar.css';

const API_BASE_URL = process.env.CDV_PUBLIC_URL;

const UserAvatar = ({ user, className, ...props }) => {
  const src = user.avatar
    ? API_BASE_URL + user.avatar
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
