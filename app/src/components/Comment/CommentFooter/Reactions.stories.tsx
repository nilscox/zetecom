import React from 'react';

import { ReactionType } from 'src/types/Comment';

import { comment } from '../Comment.stories';

import Reaction from './Reaction';
import Reactions from './Reactions';

import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';

export default { title: 'Reactions' };

export const reaction = () => (
  <Reaction
    userReaction={boolean('is user reaction', false)}
    type={ReactionType.APPROVE}
    count={42}
    onUpdate={action('update')}
  />
);

export const reactions = () => <Reactions comment={comment} />;
