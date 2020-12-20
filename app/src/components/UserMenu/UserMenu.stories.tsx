import React from 'react';

import { action } from '@storybook/addon-actions';
import { number } from '@storybook/addon-knobs';

import { NotificationsContext } from '../../contexts/NotificationsContext';
import { useCurrentUser } from '../../contexts/UserContext';
import withMemoryRouter from '../../utils/storybook/withMemoryRouter';
import withUser from '../../utils/storybook/withUser';

import UserMenu from './index';

const withNotificationsProvider = (Story: React.FC) => {
  const count = number('notifications count', 2);

  return (
    <NotificationsContext.Provider
      value={{ count, fetchCount: action('refetch notifications'), markAsSeen: action('mark as seen') }}
    >
      <Story />
    </NotificationsContext.Provider>
  );
};

export default {
  title: 'UserMenu',
  decorators: [withMemoryRouter, withUser, withNotificationsProvider],
};

export const Demo = () => {
  const user = useCurrentUser();

  if (user) {
    return <UserMenu user={user} />;
  }

  return null;
};
