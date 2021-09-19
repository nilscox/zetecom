import { createComment, setComment } from '@zetecom/app-core';

import { Demo } from '~/demos';

import { CommentHistory } from './CommentHistory';

const comment = createComment({
  text: 'Comment version 3',
  date: new Date(2020, 1, 16, 16, 56),
  history: [
    {
      date: new Date(2020, 1, 10, 12, 17),
      text: 'Comment version 1',
    },
    {
      date: new Date(2020, 1, 10, 12, 25),
      text: 'Comment version 2\n\nThis line was addded',
    },
    {
      text: 'Comment version 3\n\nThis line was addded!',
      date: new Date(2020, 1, 16, 16, 56),
    },
    {
      text: 'Comment version 4\n\nThis line was added!',
      date: new Date(2020, 1, 16, 16, 57),
    },
  ],
});

export const commentHistory: Demo = {
  prepare: ({ store }) => {
    store.dispatch(setComment(comment));
  },
  render: () => <CommentHistory commentId={comment.id} />,
};
