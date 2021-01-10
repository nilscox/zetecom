import React from 'react';

import { action } from '@storybook/addon-actions';

import NotificationComponent from './NotificationComponent';
import RulesUpdateNotification from './notifications/RulesUpdateNotification';

export default { title: 'Notifications' };

export const singleNotification = () => (
  <NotificationComponent
    seen={false}
    imageSrc="https://via.placeholder.com/280"
    date={new Date()}
    title={
      <>
        You got a new <strong>notification</strong>!
      </>
    }
    subTitle="A new notification is available right here"
    text={
      <>
        <p>Hello! Something happened, and we wanted you to know.</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
          <br />
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </>
    }
    markAsSeen={action('markAsSeen')}
  />
);

export const rulesUpdateNotification = () => (
  <RulesUpdateNotification
    notification={{
      created: new Date(),
      id: 1,
      seen: false,
      type: 'rulesUpdate',
      payload: {
        version: '6',
      },
    }}
    markAsSeen={action('markAsSeen')}
  />
);
