import React from 'react';

import { action } from '@storybook/addon-actions';
import { number } from '@storybook/addon-knobs';
import { addDecorator } from '@storybook/react';

import { NotificationsContext } from 'src/contexts/NotificationsContext';

import { useCurrentUser } from '../../contexts/UserContext';

import UserMenu from './index';

export default {
  title: 'UserMenu',
};

const NotificationsProvider = NotificationsContext.Provider;

const NotificationsProviderKnobs: React.FC = ({ children }) => {
  const count = number('notifications count', 2);

  return (
    <NotificationsProvider value={{ count, refetch: action('refetch notifications') }}>
      { children }
    </NotificationsProvider>
  );
};

// addDecorator((StoryFn: any) => <NotificationsProviderKnobs><StoryFn /></NotificationsProviderKnobs>);

export const Demo = () => {
  const user = useCurrentUser();

  if (user)
    return <UserMenu user={user} />;

  return null;
};
