import React from 'react';

import { action } from '@storybook/addon-actions';
import { number } from '@storybook/addon-knobs';

import FetchMoreReplies from './FetchMoreReplies';

export default { title: 'CommentContainer' };

export const fetchMoreReplies = () => (
  <FetchMoreReplies remainingRepliesCount={number('Remaining', 8)} fetchMoreReplies={action('fetchMoreReplies')} />
);
