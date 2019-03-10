import React from 'react';
import PropTypes from 'prop-types';

import { User } from 'Types';
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

UserAvatar.propTypes = {
  user: PropTypes.instanceOf(User).isRequired,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  props: Object,
};

export default UserAvatar;
