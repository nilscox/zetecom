import React from 'react';

import { boolean } from '@storybook/addon-knobs';

import { UserContext } from '../../contexts/UserContext';
import makeUser from '../../test/makeUser';

const withUser = (Story: React.FC) => {
  const user = makeUser({ nick: 'Doug Forcett' });
  const loggedIn = boolean('logged in', true);

  return (
    <UserContext.Provider value={[loggedIn ? user : null, () => {}]}>
      <Story />
    </UserContext.Provider>
  );
};

export default withUser;
