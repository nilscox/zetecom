import React from 'react';

import { createNotification, setAuthenticatedUser } from '@zetecom/app-core';

import { Demo } from '~/demos';
import { dougForcett } from '~/fixtures';
import { array } from '~/utils/array';

import { UserMenu } from './UserMenu';

export const unauthenticated: Demo = {
  render: () => <UserMenu />,
};

export const authenticated: Demo = {
  prepare: async ({ store, deps: { userGateway } }) => {
    userGateway.notifications = array(6, () => createNotification());

    await store.dispatch(setAuthenticatedUser(dougForcett));
  },
  render: () => <UserMenu />,
};
