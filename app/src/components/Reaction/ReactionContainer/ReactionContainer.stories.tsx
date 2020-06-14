import React from 'react';

import FetchMoreReplies from './FetchMoreReplies';

import { action } from '@storybook/addon-actions';
import { number } from '@storybook/addon-knobs';

export default { title: 'ReactionContainer' };

export const fetchMoreReplies = () => (
  <FetchMoreReplies remainingRepliesCount={number('Remaining', 8)} fetchMoreReplies={action('fetchMoreReplies')} />
);
