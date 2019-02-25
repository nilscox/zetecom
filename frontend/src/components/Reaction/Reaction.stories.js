import * as React from 'react';
import { storiesOf } from '@storybook/react';

import { User, Reaction as ReactionType } from 'Types';
import Reaction from './Reaction';

import { getReaction, getUser } from 'mocks';

const reaction = getReaction(0, getUser(0));

storiesOf('Reaction', module)
  .add('message', () => (
    <div className="p-2 storybook storybook-reaction">
      <Reaction
        reaction={reaction}
      />
    </div>
  ));
