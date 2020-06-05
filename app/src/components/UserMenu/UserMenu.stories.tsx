import React from 'react';

import { useCurrentUser } from '../../contexts/UserContext';

import UserMenu from './index';

export default { title: 'UserMenu' };

export const Demo = () => {
  const user = useCurrentUser();

  if (user)
    return <UserMenu user={user} />;

  return null;
};
