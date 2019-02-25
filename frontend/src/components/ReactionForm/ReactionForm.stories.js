import * as React from 'react';
import { storiesOf } from '@storybook/react';

import ReactionForm from './ReactionForm';

import { getReaction, getUser } from 'mocks';

const reaction = getReaction(0, getUser(0));
const user = getUser(1);

storiesOf('ReactionForm', module)
  .add('empty', () => (
    <div className="p-2 storybook storybook-reaction-form">
      <ReactionForm author={user} />
    </div>
  ))
  .add('reply to', () => (
    <div className="p-2 storybook storybook-reaction-form">
      <ReactionForm author={user} replyTo={reaction} />
    </div>
  ))
  .add('edit', () => (
    <div className="p-2 storybook storybook-reaction-form">
      <ReactionForm author={user} reaction={reaction} />
    </div>
  ));
