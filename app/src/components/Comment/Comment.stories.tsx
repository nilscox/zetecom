/* eslint-disable max-lines */

import React from 'react';

import { ReactionType } from 'src/types/Comment';

import makeComment from '../../test/makeComment';
import withUser from '../../utils/storybook/withUser';

import data from './__mocks__/lorem.json';
import CommentComponent, { CommentComponentProps } from './CommentComponent';

export default {
  component: CommentComponent,
  title: 'Comment',
  decorators: [withUser],
};

const { lorem, loremMarkdown } = data;

const comment = makeComment({
  text: 'Lorem ipsum dolor sit amet...',
  reactionsCount: {
    [ReactionType.APPROVE]: 182,
    [ReactionType.REFUTE]: 23,
    [ReactionType.SKEPTIC]: 97,
  },
  score: 42,
});

// const Template = (args: CommentComponentProps) => <CommentComponent {...args} />;
// Template.args = { comment };

// export const ShortText = Template.bind({});

export const ShortText = () => <CommentComponent comment={comment} />;

export const longText = () => (
  <CommentComponent comment={{ ...comment, text: lorem.join('\n\n') }} />
);

export const markdown = () => (
  <CommentComponent
    comment={{ ...comment, text: loremMarkdown.join('\n') }}
  />
);
